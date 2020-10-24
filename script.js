import { binaryheap } from './heap.js';

onload = function() {
    let cur_data;
    const container1 = document.getElementById('question');
    const container2 = document.getElementById('solution');
    const generate = document.getElementById('generate');
    const solve = document.getElementById('solve');
    let qtext = document.getElementById('qtext');
    let stext = document.getElementById('stext');
    var option = {
        width: '100%',
        height: '100%',
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 25,
                color: 'darkgreen'
            }
        },
        nodes: {
            font: {
                size: 13,
                color: 'white',
            },
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: "FontAwesome",
                code: '\uf183',
                size: 50,
                color: 'lightgreen'
            }
        }
    };

    var network1 = new vis.Network(container1);
    network1.setOptions(option);
    var network2 = new vis.Network(container2);
    network2.setOptions(option);

    function createdata() {
        const sz = Math.floor(Math.random() * 8) + 2;

        let nodes = []
        for (let i = 1; i <= sz; i++) {
            nodes.push({ id: i, label: "Person" + i });
        }

        nodes = new vis.DataSet(nodes);
        const edges = [];
        for (let i = 1; i <= sz; i++) {
            for (let j = i + 1; j <= sz; j++) {
                if (Math.random() > 0.5) {
                    if (Math.random() > 0.5) {
                        edges.push({ from: i, to: j, label: String(Math.floor(Math.random() * 100) + 1) });
                    } else {
                        edges.push({ from: j, to: i, label: String(Math.floor(Math.random() * 100) + 1) });
                    }
                }
            }
        }

        const data = {
            nodes: nodes,
            edges: edges
        };
        return data;
    }

    generate.onclick = function() {
        const data = createdata();
        cur_data = data;
        network1.setData(data);
        qtext.style.display = 'none';
        stext.style.display = 'inline';
        container1.style.height = '100%';
        container2.style.display = 'none';
    }

    solve.onclick = function() {
        stext.style.display = 'none';
        container2.style.display = 'inline';
        const solved = solvedata();
        network2.setData(solved);
    }

    function solvedata() {
        let data = cur_data;
        const sz = data['nodes'].length;
        const vals = Array(sz).fill(0);
        for (let i = 0; i < data['edges'].length; i++) {
            const edge = data['edges'][i];
            vals[edge['to'] - 1] += parseInt(edge['label']);
            vals[edge['from'] - 1] -= parseInt(edge['label']);
        }

        const pos_heap = new binaryheap();
        const neg_heap = new binaryheap();

        for (let i = 0; i < sz; i++) {
            if (vals[i] > 0) {
                pos_heap.insert([vals[i], i]);
            } else {
                neg_heap.insert([-vals[i], i]);
                vals[i] *= -1;
            }
        }

        const result = [];
        while (!pos_heap.empty() && !neg_heap.empty()) {
            const ep = pos_heap.extractMax();
            const en = neg_heap.extractMax();

            const give = Math.min(ep[0], en[0]);
            const to = ep[1];
            const from = en[1];

            // console.log('${to} is giving ')
            result.push({ from: from + 1, to: to + 1, label: String(Math.abs(give)) });

            vals[to] -= give;
            vals[from] -= give;

            if (ep[0] > en[0]) {
                pos_heap.insert([vals[to], to]);
            } else if (ep[0] < en[0]) {
                neg_heap.insert([vals[from], from]);
            }
        }

        data = {
            nodes: data['nodes'],
            edges: result
        };
        return data;
    }

    generate.click();
};