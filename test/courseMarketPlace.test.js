const CourseMarketPlace = artifacts.require('CourseMarketPlace');
const { catchRevert } = require('./utils/exceptions');

// Mocha - testing framework
// Chai - assertion JS library

const getCurrentBalance = async (buyerAddress) =>
	await web3.eth.getBalance(buyerAddress);

const convertToBigNumber = (value) => web3.utils.toBN(value);

const getGas = async (repurchaseData) => {
	const repurchaseTxHash = await web3.eth.getTransaction(repurchaseData.tx);
	const gasUsed = convertToBigNumber(repurchaseData.receipt.gasUsed);
	const gasPrice = convertToBigNumber(repurchaseTxHash.gasPrice);
	const actualGasFees = gasPrice.mul(gasUsed);

	return actualGasFees;
};

contract('CourseMarketPlace', (accounts) => {
	const courseId = '0x00000000000000000000000000003130';
	const proof =
		'0x0000000000000000000000000000313000000000000000000000000000003130';

	const courseId2 = '0x00000000000000000000000000002130';
	const proof2 =
		'0x0000000000000000000000000000213000000000000000000000000000002130';

	const value = '900000000';

	let _contract = null;
	let contractOwner = null;
	let buyer = null;
	let courseHash = null;

	before(async () => {
		_contract = await CourseMarketPlace.deployed();
		contractOwner = accounts[0];
		buyer = accounts[1];
	});

	describe('Purchase the new course', () => {
		before(async () => {
			await _contract.purchaseCourse(courseId, proof, {
				from: buyer,
				value,
			});
		});

		it('should NOT allow to repurchase an already owned course', async () => {
			await catchRevert(
				_contract.purchaseCourse(courseId, proof, {
					from: buyer,
					value,
				}),
			);
		});

		it('can get the purchased course hash by index', async () => {
			const index = 0;
			courseHash = await _contract.getCourseHashAtIndex(index);

			const expectedHash = web3.utils.soliditySha3(
				{ type: 'bytes16', value: courseId },
				{ type: 'address', value: buyer },
			);

			assert.equal(
				courseHash,
				expectedHash,
				'Course hash is not matching the hash of purchased course!',
			);
		});

		it('should match the data of the purchased course', async () => {
			const expectedIndex = 0;
			const expectedStateIndex = 0; //because Purchased state is at index 0
			const course = await _contract.getCourseByHash(courseHash);

			assert.equal(
				course.id,
				expectedIndex,
				'Course index should be equal to 0',
			);

			assert.equal(
				course.price,
				value,
				`Course price should be equal to ${value}`,
			);

			assert.equal(
				course.proof,
				proof,
				`Course proof should be equal to ${proof}`,
			);

			assert.equal(
				course.owner,
				buyer,
				`Course proof should be equal to ${buyer}`,
			);

			assert.equal(
				course.state,
				expectedStateIndex,
				`Course proof should be equal to ${expectedStateIndex}`,
			);
		});
	});

	describe('Activated the purchased course', () => {
		it('activation should NOT be accessed by non-admin', async () => {
			await catchRevert(_contract.activateCourse(courseHash, { from: buyer }));
		});

		it('should have a status of ACTIVATED', async () => {
			await _contract.activateCourse(courseHash, {
				from: contractOwner,
			});

			const course = await _contract.getCourseByHash(courseHash);
			const expectedStateIndex = 1;

			assert.equal(
				course.state, //course.state returns the index number, not the state value
				expectedStateIndex,
				'Course does not meet the expected state which should be ACTIVATED',
			);
		});
	});

	describe('Transfer ownership', () => {
		let currentOwner = null;

		before(async () => {
			currentOwner = await _contract.getContractOwner();
		});

		it('should return the contract deployer address', async () => {
			assert.equal(
				contractOwner,
				currentOwner,
				'Current owner is not the matching contract owner.',
			);
		});

		it('should NOT transfer ownership when the owner is not sending a transaction', async () => {
			await catchRevert(
				_contract.transferOwnership(accounts[3], { from: accounts[4] }),
			);
		});

		it('should transfer ownership to the 3rd address from "accounts"', async () => {
			await _contract.transferOwnership(accounts[2], { from: currentOwner });
			currentOwner = await _contract.getContractOwner();

			assert.equal(
				currentOwner,
				accounts[2],
				'Current owner is not accounts[2]',
			);
		});

		it('should transfer ownership back to original owner accounts[0]', async () => {
			await _contract.transferOwnership(contractOwner, { from: currentOwner });
			currentOwner = await _contract.getContractOwner();

			assert.equal(
				currentOwner,
				contractOwner,
				'Current owner is not accounts[0]',
			);
		});
	});

	describe('Deactivate course', () => {
		let courseHash2 = null;
		let currentOwner = null;

		before(async () => {
			await _contract.purchaseCourse(courseId2, proof2, { from: buyer, value });
			courseHash2 = await _contract.getCourseHashAtIndex(1);
			currentOwner = await _contract.getContractOwner();
		});

		it('should NOT be able to deactivate the course if NOT contract owner', async () => {
			await catchRevert(
				_contract.deactivateCourse(courseHash2, { from: buyer }),
			);
		});

		it('should have a state of Deactivated and a price of 0', async () => {
			const beforeDeactivationBuyerBalance = await getCurrentBalance(buyer);
			const beforeDeactivationContractBalance = await getCurrentBalance(
				_contract.address,
			);
			const beforeDeactivationContractOwnerBalance = await getCurrentBalance(
				currentOwner,
			);

			const deactivationData = await _contract.deactivateCourse(courseHash2, {
				from: contractOwner,
			});

			const afterDeactivationBuyerBalance = await getCurrentBalance(buyer);
			const afterDeactivationContractBalance = await getCurrentBalance(
				_contract.address,
			);
			const afterDeactivationContractOwnerBalance = await getCurrentBalance(
				currentOwner,
			);

			const course = await _contract.getCourseByHash(courseHash2);
			const gasFees = await getGas(deactivationData);

			assert.equal(course.state, 2, 'Current course state is not Deactivated');
			assert.equal(course.price, 0, 'Current course price is not 0');

			assert.equal(
				convertToBigNumber(beforeDeactivationBuyerBalance)
					.add(convertToBigNumber(value))
					.toString(),
				afterDeactivationBuyerBalance,
				'Audit: Buyer balance is not correct.',
			);

			assert.equal(
				convertToBigNumber(beforeDeactivationContractBalance)
					.sub(convertToBigNumber(value))
					.toString(),
				afterDeactivationContractBalance,
				'Audit: ContractOwner balance is not correct.',
			);

			assert.equal(
				convertToBigNumber(beforeDeactivationContractOwnerBalance)
					.sub(gasFees)
					.toString(),
				afterDeactivationContractOwnerBalance,
				'Audit: ContractOwner balance is not correct.',
			);
		});

		it('should NOT be able to reactivate a deactivated course without repurchasing it', async () => {
			await catchRevert(
				_contract.activateCourse(courseHash2, { from: contractOwner }),
			);
		});
	});

	describe('Repurchase the course', () => {
		let courseHash2 = null;

		before(async () => {
			courseHash2 = await _contract.getCourseHashAtIndex(1);
		});

		it('should NOT be repurchased if course does NOT exist', async () => {
			const nonExistingHash =
				'0x5ceb3f8075c3dbb5d490c8d1e6c950302ed065e1a9031750ad2c6513069e3fc3';

			await catchRevert(
				_contract.repurchaseCourse(nonExistingHash, { from: buyer }),
			);
		});

		it('should NOT be repurchased by someone who is NOT the owner of the course', async () => {
			const notOwnerAddress = accounts[2];
			await catchRevert(
				_contract.repurchaseCourse(courseHash2, { from: notOwnerAddress }),
			);
		});

		it('should be able to be repurchased by the original buyer', async () => {
			const beforeRepurchaseBuyerBalance = await getCurrentBalance(buyer);
			const beforeRepurchaseContractBalance = await getCurrentBalance(
				_contract.address,
			);

			const repurchaseData = await _contract.repurchaseCourse(courseHash2, {
				from: buyer,
				value,
			});

			const afterRepurchaseBuyerBalance = await getCurrentBalance(buyer);
			const afterRepurchaseContractBalance = await getCurrentBalance(
				_contract.address,
			);

			const course = await _contract.getCourseByHash(courseHash2);
			const expectedState = 0;

			assert.equal(
				course.state,
				expectedState,
				'Course is not in purchased state.',
			);

			assert.equal(
				course.price,
				value,
				`The course price does not match the value which is ${value}`,
			);

			assert.equal(
				convertToBigNumber(beforeRepurchaseBuyerBalance)
					.sub(convertToBigNumber(value))
					.sub(await getGas(repurchaseData))
					.toString(),
				afterRepurchaseBuyerBalance,
				'Client balance pre-purchase should NOT be equal to post-purchase.',
			);

			assert.equal(
				convertToBigNumber(beforeRepurchaseContractBalance)
					.add(convertToBigNumber(value))
					.toString(),
				afterRepurchaseContractBalance,
				'Contract balance pre-purchase should NOT be equal to post-purchase.',
			);
		});

		it('should NOT be repurchased if already purchased', async () => {
			await catchRevert(
				_contract.repurchaseCourse(courseHash2, {
					from: buyer,
				}),
			);
		});
	});

	describe('Contract receives funds', () => {
		it('should have incoming transacted funds', async () => {
			const value = '100000000000000000';
			const contractBalanceBeforeTx = await getCurrentBalance(
				_contract.address,
			);

			await web3.eth.sendTransaction({
				from: buyer,
				to: _contract.address,
				value,
			});

			const contractBalanceAfterTx = await getCurrentBalance(_contract.address);

			assert.equal(
				convertToBigNumber(contractBalanceBeforeTx)
					.add(convertToBigNumber(value))
					.toString(),
				contractBalanceAfterTx,
				'CMPTest: Expected contract balance mismatch.',
			);
		});
	});

	describe('Normal withdraw from the contract', () => {
		const fundsToDeposit = '100000000000000000';
		const overLimitFunds = '999990000000000000000';
		let currentOwner = null;

		before(async () => {
			currentOwner = await _contract.getContractOwner();

			await web3.eth.sendTransaction({
				from: buyer,
				to: _contract.address,
				value: fundsToDeposit,
			});
		});

		it('should fail when withdrawing using NOT owner address', async () => {
			const value = '10000000000000000';
			await catchRevert(_contract.withdraw(value, { from: buyer }));
		});

		it('should fail when withdrawing over available contract funds', async () => {
			await catchRevert(
				_contract.withdraw(overLimitFunds, { from: currentOwner }),
			);
		});

		it('should have +0.1eth after withdraw', async () => {
			const ownerBalanceBeforeWithdraw = await getCurrentBalance(currentOwner);
			const withdrawData = await _contract.withdraw(fundsToDeposit, {
				from: currentOwner,
			});

			const ownerBalanceAfterWithdraw = await getCurrentBalance(currentOwner);

			const gas = await getGas(withdrawData);

			assert.equal(
				// convertToBigNumber(ownerBalanceBeforeWithdraw)
				// 	.add(convertToBigNumber(withdrawData))
				// 	.toString(),
				convertToBigNumber(ownerBalanceBeforeWithdraw)
					.add(convertToBigNumber(fundsToDeposit))
					.sub(gas)
					.toString(),
				ownerBalanceAfterWithdraw,
				'CMP.test: Owner balance pre and post withdraw should not be equal.',
			);
		});
	});

	describe('Emergency withdraw', () => {
		let currentOwner = null;

		before(async () => {
			currentOwner = await _contract.getContractOwner();
		});

		after(async () => {
			await _contract.resumeContract({ from: currentOwner });
		});

		it('should fail if contract is not stopped', async () => {
			await catchRevert(_contract.emergencyWithdraw({ from: currentOwner }));
		});

		it('should have +contract funds on owner balance', async () => {
			await _contract.stopContract({ from: currentOwner });

			const contractBal = await getCurrentBalance(_contract.address);
			const ownerBal = await getCurrentBalance(currentOwner);

			const emerWdrawData = await _contract.emergencyWithdraw({
				from: currentOwner,
			});

			const gas = await getGas(emerWdrawData);

			const ownerBal2 = await getCurrentBalance(currentOwner);

			assert.equal(
				convertToBigNumber(ownerBal)
					.add(convertToBigNumber(contractBal))
					.sub(gas)
					.toString(),
				ownerBal2,
				'CMP.test: Mismatching owner balance.',
			);
		});

		it('should have a contract balance of 0', async () => {
			const contractBal = await getCurrentBalance(_contract.address);

			assert.equal(
				contractBal,
				0,
				'CMP.test: Contract balance should be equal to 0.',
			);
		});
	});

	describe('Self destruct', () => {
		let currentOwner = null;

		before(async () => {
			currentOwner = await _contract.getContractOwner();
		});

		it('should fail if contract is not stopped', async () => {
			await catchRevert(_contract.selfDestruct({ from: currentOwner }));
		});

		it('should have +contract funds on owner balance', async () => {
			await _contract.stopContract({ from: currentOwner });

			const contractBal = await getCurrentBalance(_contract.address);
			const ownerBal = await getCurrentBalance(currentOwner);

			const emerWdrawData = await _contract.selfDestruct({
				from: currentOwner,
			});

			const gas = await getGas(emerWdrawData);

			const ownerBal2 = await getCurrentBalance(currentOwner);

			assert.equal(
				convertToBigNumber(ownerBal)
					.add(convertToBigNumber(contractBal))
					.sub(gas)
					.toString(),
				ownerBal2,
				'CMP.test: Mismatching owner balance.',
			);
		});

		it('should have a contract balance of 0', async () => {
			const contractBal = await getCurrentBalance(_contract.address);

			assert.equal(
				contractBal,
				0,
				'CMP.test: Contract balance should be equal to 0.',
			);
		});

		it('should have a 0x bytecode', async () => {
			const code = await web3.eth.getCode(_contract.address);

			assert.equal(code, '0x', 'Contract was not destroyed.');
		});
	});
});

// CMP tx hash: 0x247d08c71f30e7660c2dfefe13907c040bd9fd2dbda450040e15f671232567c1
// CMP contract addy: 0x43A6199279835Fe1b2d30ff57E8d00Cf3a9B0153
