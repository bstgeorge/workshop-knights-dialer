export default {
	reachableKeys,
	countPaths,
	listAcyclicPaths
};


// ****************************

var dialpad = [
	[1, 8, 3],
	[6, 0, 4],
	[7, 2, 9]
];

function reachableKeys(startingDigit) {
	// TODO: return which digits a Knight's move
	// can hop to from a given starting digit/key
	//
	// e.g. 3 -> [ 4, 8 ]
	//      4 -> [ 3, 9, 0 ]
	//      5 -> []
	return [];
}

function countPaths(startingDigit, hopCount, queue = []) {
	// TODO: given the digit/key to start from and
	// the number of hops to take, return a count
	// of all the possible paths that could be
	// traversed
	// find location of starting digit
	// let queue = [];
	// if hopCount > 0, keep adding possible jumps to queue
	let pathCount = 0;
	if (hopCount > 0) {
		for (let r = 0; r <= 2; r++) {
			for (let c = 0; c <= 2; c++) {
				if (startingDigit === dialpad[r][c]) {
					// starting digit found
					// add adjacent cells
					// left
					if (c >= 1) {
						queue.push(dialpad[r][c - 1])
						pathCount++;
					}
					// right
					if (c <= 1) {
						queue.push(dialpad[r][c + 1])
						pathCount++;
					}
					// up
					if (r >= 1 && startingDigit !== 0) {
						queue.push(dialpad[r - 1][c])
						pathCount++
					}
					// down
					if (r <= 1 && startingDigit !== 0) {
						queue.push(dialpad[r + 1][c])
						pathCount++;
					}
					if (startingDigit === 8 || startingDigit === 2) {
						queue.pop();
						pathCount--;
					}
				}
			}
		}
	}
	console.log('queue: ', queue)
	// base case
	if (queue.length === 0) {
		return pathCount;
	} else {
	// non base case
		pathCount += countPaths(queue.shift(), --hopCount, queue)
		return pathCount;
	}
	return 0;
}

function listAcyclicPaths(startingDigit) {
	// TODO: given the digit/key to start from,
	// return a list of the distinct acyclic
	// paths that are possible to traverse
	//
	// e.g. [
	//   [4, 3, 8, 1, 6, 7, 2, 9],
	//   [4, 3, 8, 1, 6, 0],
	//   ...
	// ]
	return [];
}
