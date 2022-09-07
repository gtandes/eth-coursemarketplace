// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract CourseMarketPlace {
	enum State {
		Purchased,
		Activated,
		Deactivated
	}

	struct Course {
		uint256 id;
		uint256 price;
		bytes32 proof;
		address owner;
		State state;
	}

	bool public isStopped = false;

	// mapping of courseID to courseHash
	mapping(uint256 => bytes32) private ownedCourseHash;

	// mapping of courseHash to course data
	mapping(bytes32 => Course) private ownedCourses;

	// number of all courses + id of the course
	uint256 private totalOwnedCourses;

	address payable private owner;

	constructor() {
		setContractOwner(msg.sender);
	}

	modifier onlyOwner() {
		require(
			msg.sender == getContractOwner(),
			'This can only be done by contract owner.'
		);
		_;
	}

	modifier onlyWhenNotStopped() {
		require(!isStopped);
		_;
	}

	modifier onlyWhenStopped() {
		require(isStopped);
		_;
	}

	// enables the smart contract to accept incoming transactions directly
	receive() external payable {}

	function withdraw(uint256 withdrawAmount) external onlyOwner {
		(bool success, ) = owner.call{ value: withdrawAmount }('');
		require(success, 'CMP.sol: Withdraw failed.');
	}

	function emergencyWithdraw() external onlyOwner onlyWhenStopped {
		(bool success, ) = owner.call{ value: address(this).balance }('');
		require(success, 'CMP.sol: Withdraw failed.');
	}

	function selfDestruct() external onlyOwner onlyWhenStopped {
		selfdestruct(owner);
	}

	function stopContract() external onlyOwner {
		isStopped = true;
	}

	function resumeContract() external onlyOwner {
		isStopped = false;
	}

	function setContractOwner(address newOwner) private {
		owner = payable(newOwner);
	}

	function _hasCourseOwnership(bytes32 courseHash) private view returns (bool) {
		return ownedCourses[courseHash].owner == msg.sender;
	}

	function _isCourseCreated(bytes32 courseHash) private view returns (bool) {
		// return ownedCourses[courseHash].owner != address(0);
		return
			ownedCourses[courseHash].owner !=
			0x0000000000000000000000000000000000000000;
	}

	///You already bought this course.
	error CourseHasOwner();

	///This address does not own this course yet.
	error RequesterIsNotOwner();

	///Course does not exist.
	error CourseIsNotCreated();

	///Course is not purchased yet.
	error CourseIsNotPurchased();

	function purchaseCourse(
		bytes16 courseID, //0x00000000000000000000000000003130
		bytes32 proof //0x0000000000000000000000000000313000000000000000000000000000003130
	) external payable onlyWhenNotStopped {
		bytes32 courseHash = keccak256(abi.encodePacked(courseID, msg.sender));

		if (_hasCourseOwnership(courseHash)) {
			revert CourseHasOwner();
		}

		uint256 id = totalOwnedCourses++;

		ownedCourseHash[id] = courseHash;

		ownedCourses[courseHash] = Course({
			id: id,
			price: msg.value,
			proof: proof,
			owner: msg.sender,
			state: State.Purchased
		});
	}

	function repurchaseCourse(bytes32 courseHash)
		external
		payable
		onlyWhenNotStopped
	{
		require(_isCourseCreated(courseHash), 'Course is not yet created.');

		require(
			_hasCourseOwnership(courseHash) == true,
			'This address does not own this course yet.'
		);

		Course storage course = ownedCourses[courseHash];

		require(
			course.state == State.Deactivated,
			'Cannot repurchase a course that has not been deactivated.'
		);

		course.state = State.Purchased;
		course.price = msg.value;
	}

	function activateCourse(bytes32 courseHash)
		external
		onlyOwner
		onlyWhenNotStopped
	{
		if (!_isCourseCreated(courseHash)) {
			revert CourseIsNotCreated();
		}

		Course storage course = ownedCourses[courseHash];

		if (course.state != State.Purchased) {
			revert CourseIsNotPurchased();
		}

		course.state = State.Activated;
	}

	function deactivateCourse(bytes32 courseHash)
		external
		onlyOwner
		onlyWhenNotStopped
	{
		if (!_isCourseCreated(courseHash)) {
			revert CourseIsNotCreated();
		}

		Course storage course = ownedCourses[courseHash];

		if (course.state != State.Purchased) {
			revert CourseIsNotPurchased();
		}

		(bool success, ) = course.owner.call{ value: course.price }('');
		require(success, 'CMP.sol: Transferring funds back to the owner failed. ');

		course.state = State.Deactivated;
		course.price = 0;
	}

	function transferOwnership(address newOwner) external onlyOwner {
		setContractOwner(newOwner);
	}

	function getCourseCount() external view returns (uint256) {
		return totalOwnedCourses;
	}

	function getCourseHashAtIndex(uint256 index) external view returns (bytes32) {
		return ownedCourseHash[index];
	}

	function getCourseByHash(bytes32 courseHash)
		external
		view
		returns (Course memory)
	{
		return ownedCourses[courseHash];
	}

	function getContractOwner() public view returns (address) {
		return owner;
	}
}
//0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
//keccak256 - c4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
