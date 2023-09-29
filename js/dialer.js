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

var nearByKeys = [
	[4, 6],
	[6, 8],
	[7, 9],
	[4, 8],
	[3, 9, 0],
	[],
	[1, 7, 0],
	[2, 6],
	[1, 3],
	[2, 4]
]

var comingFrom = [
	[4, 6],
	[6, 8],
	[7, 9],
	[4, 8],
	[3, 9, 0],
	[],
	[1, 7, 0],
	[2, 6],
	[1, 3],
	[2, 4]
]

let allPaths = [];
let acyclicPathCount = 0;
let acyclicPaths = [];

function reachableKeys(startingDigit) {
	// TODO: return which digits a Knight's move
	// can hop to from a given starting digit/key
	//
	// e.g. 3 -> [ 4, 8 ]
	//      4 -> [ 3, 9, 0 ]
	//      5 -> []
	return nearByKeys[startingDigit];
}

function countPaths(startingDigit, hopCount, queue = []) {
	// TODO: given the digit/key to start from and
	// the number of hops to take, return a count
	// of all the possible paths that could be
	// traversed

	class TreeNode {
		constructor(digit) {
			this.value = digit;
			this.children = [];
		}
	}

	let buildTree = (currentNode, hopCount) => {
		for (let knightMove of nearByKeys[currentNode.value]) {
			let child = new TreeNode(knightMove);
			currentNode.children.push(child);
		}
		hopCount--;
		// base case
		if (hopCount === 0) {
			return;
		} else {
			for (let child of currentNode.children) {
				buildTree(child, hopCount);
				// child = new Tree(child, hopCount);
			}
		}
	}

	// buildTree = memoize(buildTree);

	let countTerminalNodes = (currentNode) => {
		let count = 0;
		// base case
		if (currentNode.children.length === 0) {
			return 1;
		} else {
			for (let child of currentNode.children) {
				count += countTerminalNodes(child)
			}
		}
		return count;
	}

	let countTotalNodes = (currentNode) => {
		let count = 1;
		// base case
		if (currentNode.children.length === 0) {
			return 1;
		} else {
			for (let child of currentNode.children) {
				count += countTotalNodes(child);
			}
		}
		return count;
	}

	let trimTree = (currentNode, currentPath = [currentNode.value]) => {
		currentPath.map((element) => {
			for (let i = 0; i < currentNode.children.length; i++) {
				if (element === currentNode.children[i].value) {
					currentNode.children.splice(i, 1);
				}
			}
		})
		// base case
		if (currentNode.children.length === 0) {
			return;
		}
		for (let child of currentNode.children) {
			trimTree(child, currentPath.concat(currentNode.value));
		}
	}

	let getPaths = (currentNode, currentPath = []) => {
		// base case
		currentPath = currentPath.concat(currentNode.value)
		if (currentNode.children.length === 0) {
			allPaths.push(currentPath);
			return;
		}
		for (let child of currentNode.children) {
			getPaths(child, currentPath);
		}
	}

	let getAcyclicPaths = (currentNode, currentPath = []) => {
		currentPath.push(currentNode.value);
		if (currentNode.children.length === 0) {
			acyclicPaths.push(currentPath);
			return;
		}
		for (let child of currentNode.children) {
			getAcyclicPaths(child, currentPath);
		}
		console.log('acyclic paths: ', acyclicPaths)
	}

	let countNodes = (startingDigit, hopCount) => {
		let count = 0;
		// base case
		if (hopCount === 0) {
			return 1;
		}
		hopCount--;
		for (let child of nearByKeys[startingDigit]) {
			// don't decrement for each child occurence.  Needs to happen outside of for loop.
			count += countNodes(child, hopCount);
		}
		return count;
	}

	// perform tabulation

	let tabulation = (startingDigit, hopCount) => {
		let counter = Array(10).fill(1);
		let buckets = Array(10);
		for (let jump = 0; jump < hopCount; jump++) {
			buckets.fill(0);
			for (let n = 0;  n < 10; n++) {
				for (let element of comingFrom[n]) {
					buckets[n] += counter[element];
				}
			}
			counter = [...buckets];
		}
		console.log(buckets);
	}

	tabulation(startingDigit, hopCount);

	let root = new TreeNode(startingDigit);
	buildTree(root, hopCount);
	console.log('root: ', root);
	let totalNodes = countTotalNodes(root);
	let terminalNodes = countTerminalNodes(root);
	console.log('total nodes: ', totalNodes);
	console.log('terminal nodes: ', terminalNodes);
	// let trimmedTree = new TreeNode(startingDigit);
	// buildTree(trimmedTree, hopCount);
	// trimTree(trimmedTree);
	// console.log('trimmedTree: ', trimmedTree);
	// let trimmedTotalNodes = countTotalNodes(trimmedTree);
	// let trimmedTerminalNodes = countTerminalNodes(trimmedTree);
	// console.log('trimmed total nodes: ', trimmedTotalNodes);
	// console.log('trimmed terminal nodes: ', trimmedTerminalNodes);
	// getPaths(trimmedTree);
	// console.log('allPaths: ', allPaths)

	countNodes = memoize(countNodes);
	return(countNodes(startingDigit, hopCount))

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
	return [allPaths];
}

function memoize (fn) {
	let cache = {};
	console.log(cache)
	return function memoized(currentNode, hopCount) {
		if (!cache[`${currentNode}:${hopCount}`]) {
			cache[`${currentNode}:${hopCount}`] = fn(currentNode, hopCount);
		}
		return cache[`${currentNode}:${hopCount}`]
	}
}
