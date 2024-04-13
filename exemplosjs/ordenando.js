// Função swap
const swap = (arr, pos1, pos2) => {
    [arr[pos1], arr[pos2]] = [arr[pos2], arr[pos1]];
};

// Função shuffle
const shuffle = (arr) => {
    const len = arr.length;
    for (let i = len - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

// Função bubble_sort
const bubble_sort = arr => {
    const len = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
};

// Função selection_sort
const selection_sort = arr => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swap(arr, i, minIndex);
        }
    }
    return arr;
};

// Função quick_sort
const quick_sort = (arr, start = 0, end = arr.length - 1) => {
    if (start >= end) return;
    const pivotIndex = particionamento(arr, start, end);
    quick_sort(arr, start, pivotIndex - 1);
    quick_sort(arr, pivotIndex + 1, end);
    return arr;
};

// Função particionamento
const particionamento = (arr, start, end) => {
    const pivot = arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, end);
    return i + 1;
};

// Função para adicionar um valor à lista de valores
const addValueToList = () => {
    const valorInput = document.getElementById('valor');
    const listaValores = document.getElementById('valores');
    const node = document.createElement('li');
    const valor = document.createTextNode(valorInput.value);
    node.appendChild(valor);
    listaValores.appendChild(node);
};

// Função para ordenar a lista de valores
const orderList = () => {
    const listaValores = document.getElementById('valores');
    const algoritmo = document.getElementById('algoritmo').value;
    const valores = Array.from(listaValores.children).map(item => parseInt(item.innerHTML));
    
    switch (algoritmo) {
        case 'bubble':
            bubble_sort(valores);
            break;
        case 'selection':
            selection_sort(valores);
            break;
        case 'quick':
            quick_sort(valores);
            break;
        default:
            console.error('Algoritmo não reconhecido');
    }

    listaValores.innerHTML = valores.map(item => `<li>${item}</li>`).reduce((acc, curr) => acc + curr, '');
};

// Função para misturar a lista de valores
const shuffleList = () => {
    const listaValores = document.getElementById('valores');
    const listItems = Array.from(listaValores.children);
    
    // Extract values from list items and shuffle them
    const valores = listItems.map(item => parseInt(item.textContent));
    shuffle(valores);

    // Clear existing list items
    listaValores.innerHTML = '';

    // Append shuffled values as new list items
    valores.forEach(item => {
        const node = document.createElement('li');
        const textNode = document.createTextNode(item);
        node.appendChild(textNode);
        listaValores.appendChild(node);
    });
};
