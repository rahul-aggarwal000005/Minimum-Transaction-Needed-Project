export { binaryheap }

class binaryheap {

    constructor() {
        this.heap = [];
    }

    insert(val) {
        console.log(val);
        this.heap.push(val);
        this.bubbleUp();
    }

    size() {
        return this.heap.length;
    }

    empty() {
        return this.size() == 0;
    }

    bubbleUp() {
        let idx = this.size() - 1;
        while (idx > 0) {
            let element = this.heap[idx];
            let parentidx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentidx];
            if (parent[0] >= element[0]) {
                break;
            }
            this.heap[idx] = parent;
            this.heap[parentidx] = element;
            idx = parentidx;
        }
    }

    extractMax() {
        const max = this.heap[0];
        let temp = this.heap.pop()
        if (!this.empty()) {
            this.heap[0] = temp;
            this.sinkDown(0);
        }
        return max;
    }

    sinkDown(idx) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        let l = idx;
        if (left < this.size() && this.heap[left] >= this.heap[l]) {
            l = left;
        }
        if (right < this.size() && this.heap[right] >= this.heap[l]) {
            l = right;
        }

        if (l != idx) {
            let temp = this.heap[l];
            this.heap[l] = this.heap[idx];
            this.heap[idx] = temp;
            this.sinkDown(l);
        }
    }
};