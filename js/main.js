let selectedElements = [];
let currentAnimationFrame = null;

function startAnimation() {
    console.log("Starting fresh animation...");

    if (currentAnimationFrame) {
        cancelAnimationFrame(currentAnimationFrame);
    }

    window.animationStarted = true;

    const clickInstruction = document.querySelector('.click-instruction');
    const animationContainer = document.querySelector('.animation-container');
    const loadingBar = document.querySelector('.loading-bar');

    if (clickInstruction) clickInstruction.style.display = 'none';
    if (animationContainer) animationContainer.style.display = 'block';
    if (loadingBar) loadingBar.style.display = 'block';

    const container = document.getElementById('animationContainer');
    const loadingProgress = document.querySelector('.loading-progress');

    if (container) container.innerHTML = '';

    if (loadingProgress) {
        loadingProgress.style.width = '0%';
        loadingProgress.style.animation = 'loading 3s ease-in-out forwards';
    }

    const nucleus = document.createElement('div');
    nucleus.className = 'atom nucleus';
    if (container) container.appendChild(nucleus);

    const orbits = [100, 150, 200];
    orbits.forEach(radius => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = `${radius * 2}px`;
        orbit.style.height = `${radius * 2}px`;
        orbit.style.top = `${150 - radius}px`;
        orbit.style.left = `${200 - radius}px`;
        if (container) container.appendChild(orbit);
    });

    const reactions = [
        "Laboratory Initialized...",
        "Quantum Systems Online...",
        "Spectral Analysis Ready...",
        "Laboratory 1.O Active"
    ];

    reactions.forEach((text, index) => {
        setTimeout(() => {
            const reactionText = document.createElement('div');
            reactionText.className = 'reaction-text';
            reactionText.textContent = text;
            reactionText.style.top = `${50 + index * 30}px`;
            if (container) container.appendChild(reactionText);

            setTimeout(() => {
                if (reactionText.parentNode) {
                    reactionText.parentNode.removeChild(reactionText);
                }
            }, 3000);
        }, index * 1000);
    });

    setTimeout(() => {
        goToPage(2);
    }, 4000);
}

function goToPage(pageNumber) {
    console.log(`Going to page ${pageNumber}`);

    document.querySelectorAll('[id^="page"]').forEach(page => {
        page.style.display = 'none';
    });

    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.style.display = pageNumber === 1 ? 'flex' : 'block';
    }

    if (pageNumber === 2) {
        initializeSimulationPage();
    } else if (pageNumber === 1) {
        window.animationStarted = false;
        const clickInstruction = document.querySelector('.click-instruction');
        const animationContainer = document.querySelector('.animation-container');
        const loadingBar = document.querySelector('.loading-bar');

        if (clickInstruction) clickInstruction.style.display = 'block';
        if (animationContainer) {
            animationContainer.style.display = 'none';
            animationContainer.innerHTML = '';
        }
        if (loadingBar) loadingBar.style.display = 'none';
    }
}

function initializeSimulationPage() {
    console.log("Initializing simulation page...");
    initializePeriodicTable();
    initializeCompoundGrid();
    setupEventListeners();
    updateStepsChart();

    const canvas = document.getElementById('molecule-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function initializePeriodicTable() {
    const tableContainer = document.getElementById('periodic-table');
    if (!tableContainer) {
        console.error("Periodic table container not found!");
        return;
    }

    tableContainer.innerHTML = '';

    for (let i = 1; i <= 118; i++) {
        const element = periodicTable.find(el => el.number === i);
        const cell = document.createElement('div');
        if (element) {
            cell.className = `element element-category-${element.category}`;
            cell.innerHTML = `
                    <div class="element-number">${element.number}</div>
                    <div class="element-symbol">${element.symbol}</div>
                `;
            cell.dataset.element = JSON.stringify(element);
            cell.addEventListener('click', handleElementSelection);
        } else {
            cell.className = 'empty-cell';
        }
        tableContainer.appendChild(cell);
    }
}

function initializeCompoundGrid() {
    const compoundGrid = document.getElementById('compound-grid');
    const compoundSearch = document.getElementById('compound-search');
    const compoundCount = document.getElementById('compound-count');
    
    if (!compoundGrid) return;

    // Display all compounds initially
    displayCompounds(compoundDatabase);

    // Update compound count
    if (compoundCount) {
        compoundCount.textContent = `Showing ${Object.keys(compoundDatabase).length} compounds`;
    }

    // Add search functionality
    if (compoundSearch) {
        compoundSearch.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            if (searchTerm === '') {
                displayCompounds(compoundDatabase);
                if (compoundCount) {
                    compoundCount.textContent = `Showing ${Object.keys(compoundDatabase).length} compounds`;
                }
            } else {
                const filteredCompounds = {};
                
                Object.entries(compoundDatabase).forEach(([key, compound]) => {
                    if (compound.name.toLowerCase().includes(searchTerm) || 
                        compound.formula.toLowerCase().includes(searchTerm) ||
                        key.toLowerCase().includes(searchTerm)) {
                        filteredCompounds[key] = compound;
                    }
                });
                
                displayCompounds(filteredCompounds);
                if (compoundCount) {
                    compoundCount.textContent = `Showing ${Object.keys(filteredCompounds).length} of ${Object.keys(compoundDatabase).length} compounds`;
                }
            }
        });
    }
}

function displayCompounds(compounds) {
    const compoundGrid = document.getElementById('compound-grid');
    if (!compoundGrid) return;

    compoundGrid.innerHTML = '';

    // Sort compounds alphabetically by name
    const sortedCompounds = Object.entries(compounds)
        .sort((a, b) => a[1].name.localeCompare(b[1].name));

    sortedCompounds.forEach(([key, compound]) => {
        const compoundItem = document.createElement('div');
        compoundItem.className = 'compound-item';
        compoundItem.innerHTML = `
            <div class="compound-formula" style="font-weight: bold;">${compound.formula}</div>
            <div class="compound-name" style="font-size: 0.7rem; margin-top: 2px;">${compound.name}</div>
        `;
        compoundItem.dataset.compound = JSON.stringify(compound);
        compoundItem.addEventListener('click', handleCompoundSelection);
        
        // Check if this compound is already selected
        const isSelected = selectedElements.some(el => 
            el.type === 'compound' && el.formula === compound.formula
        );
        if (isSelected) {
            compoundItem.classList.add('selected');
        }
        
        compoundGrid.appendChild(compoundItem);
    });
}

function handleElementSelection(event) {
    const elementData = JSON.parse(event.currentTarget.dataset.element);
    const index = selectedElements.findIndex(el => el.number === elementData.number);

    if (index === -1) {
        selectedElements.push({...elementData, moles: 1.0, type: 'element'});
        event.currentTarget.classList.add('selected');
    } else {
        selectedElements.splice(index, 1);
        event.currentTarget.classList.remove('selected');
    }
    updateSelectedElementsDisplay();
    updateStepsChart();
    updateReactionDisplay();
}

function handleCompoundSelection(event) {
    const compoundData = JSON.parse(event.currentTarget.dataset.compound);
    const index = selectedElements.findIndex(el => 
        el.type === 'compound' && el.formula === compoundData.formula
    );

    if (index === -1) {
        selectedElements.push({
            ...compoundData, 
            moles: 1.0, 
            type: 'compound'
        });
        event.currentTarget.classList.add('selected');
    } else {
        selectedElements.splice(index, 1);
        event.currentTarget.classList.remove('selected');
    }
    updateSelectedElementsDisplay();
    updateStepsChart();
    updateReactionDisplay();
}

function updateSelectedElementsDisplay() {
    const container = document.getElementById('selected-elements');
    if (!container) return;

    container.innerHTML = '';
    let totalMoles = 0;

    selectedElements.forEach(element => {
        totalMoles += element.moles;
        const elementDiv = document.createElement('div');
        elementDiv.className = 'selected-element';

        if (element.type === 'element') {
            elementDiv.innerHTML = `
                <span>${element.symbol}</span>
                <input type="number" class="mole-input" value="${element.moles.toFixed(2)}" min="0.01" max="100" step="0.01" data-number="${element.number}">
                <button class="remove-element" data-number="${element.number}" data-type="element">×</button>
            `;
        } else {
            elementDiv.innerHTML = `
                <span>${element.formula} (${element.name})</span>
                <input type="number" class="mole-input" value="${element.moles.toFixed(2)}" min="0.01" max="100" step="0.01" data-formula="${element.formula}">
                <button class="remove-element" data-formula="${element.formula}" data-type="compound">×</button>
            `;
        }
        container.appendChild(elementDiv);
    });

    const totalMolesElement = document.getElementById('total-moles');
    if (totalMolesElement) {
        totalMolesElement.textContent = `Total Moles: ${totalMoles.toFixed(2)}`;
    }

    document.querySelectorAll('.remove-element').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            if (type === 'element') {
                const number = parseInt(this.dataset.number);
                selectedElements = selectedElements.filter(el => !(el.type === 'element' && el.number === number));
                document.querySelectorAll('.element').forEach(el => {
                    const elData = JSON.parse(el.dataset.element || '{}');
                    if (elData.number === number) el.classList.remove('selected');
                });
            } else {
                const formula = this.dataset.formula;
                selectedElements = selectedElements.filter(el => !(el.type === 'compound' && el.formula === formula));
                document.querySelectorAll('.compound-item').forEach(item => {
                    const compData = JSON.parse(item.dataset.compound || '{}');
                    if (compData.formula === formula) item.classList.remove('selected');
                });
            }
            updateSelectedElementsDisplay();
            updateStepsChart();
            updateReactionDisplay();
        });
    });

    document.querySelectorAll('.mole-input').forEach(input => {
        input.addEventListener('change', function() {
            const moles = parseFloat(this.value) || 0.01;
            if (this.dataset.number) {
                const number = parseInt(this.dataset.number);
                const element = selectedElements.find(el => el.type === 'element' && el.number === number);
                if (element) element.moles = moles;
            } else {
                const formula = this.dataset.formula;
                const compound = selectedElements.find(el => el.type === 'compound' && el.formula === formula);
                if (compound) compound.moles = moles;
            }
            updateSelectedElementsDisplay();
            updateStepsChart();
            updateReactionDisplay();
        });
    });
}

function updateReactionDisplay() {
    const reactionEquation = document.getElementById('reaction-equation');
    const predictedProduct = document.getElementById('predicted-product');

    if (!reactionEquation || !predictedProduct) return;

    if (selectedElements.length === 0) {
        reactionEquation.textContent = "No elements selected";
        predictedProduct.textContent = "";
        clearCompoundAnalysis();
        return;
    }

    const equation = selectedElements.map(el => {
        if (el.type === 'element') {
            return `${el.moles.toFixed(2)} ${el.symbol}`;
        } else {
            return `${el.moles.toFixed(2)} ${el.formula}`;
        }
    }).join(" + ");

    reactionEquation.textContent = equation + " →";

    const allElements = {};
    selectedElements.forEach(item => {
        if (item.type === 'element') {
            allElements[item.symbol] = (allElements[item.symbol] || 0) + item.moles;
        } else {
            Object.entries(item.elements).forEach(([element, count]) => {
                allElements[element] = (allElements[element] || 0) + (count * item.moles);
            });
        }
    });

    const elementSymbols = Object.keys(allElements).sort().join("");
    let foundCompound = null;

    for (const [key, compound] of Object.entries(compoundDatabase)) {
        const compoundElements = Object.keys(compound.elements).sort().join("");
        if (elementSymbols === compoundElements) {
            foundCompound = compound;
            break;
        }
    }

    if (foundCompound) {
        predictedProduct.innerHTML = `<span class="formula-display">${foundCompound.formula}</span> (<span class="compound-name-display">${foundCompound.name}</span>)`;
        displayCompoundAnalysis(foundCompound.formula);
    } else {
        const customFormula = Object.entries(allElements)
            .map(([el, count]) => el + (count > 1 ? Math.round(count) : ''))
            .join('');
        predictedProduct.textContent = `New Compound: ${customFormula}`;
        generateCustomAnalysis(allElements, customFormula);
    }
}

function generateCustomAnalysis(elements, formula) {
    const atomicMasses = {
        "H": 1.008, "C": 12.011, "N": 14.007, "O": 15.999, "F": 18.998,
        "P": 30.974, "S": 32.06, "Cl": 35.45, "Na": 22.990, "K": 39.098,
        "Mg": 24.305, "Ca": 40.078, "Fe": 55.845, "Cu": 63.546, "Zn": 65.38
    };

    let mass = 0;
    let breakdown = [];
    let totalProtons = 0;
    let isotopes = [];

    Object.entries(elements).forEach(([element, count]) => {
        mass += atomicMasses[element] * count;
        breakdown.push(`${Math.round(count)} ${element}`);

        const atomicNumber = Object.keys(atomicMasses).indexOf(element) + 1;
        totalProtons += atomicNumber * count;
        isotopes.push(`${element} (natural isotopes)`);
    });

    const molecularIon = Math.round(mass);
    const fragments = ["Characteristic fragmentation pattern"];

    const irBands = [];
    if (elements["O"] && elements["H"]) irBands.push("O-H stretch: 3200-3600 cm⁻¹");
    if (elements["C"] && elements["O"]) irBands.push("C-O/C=O stretches: 1000-1750 cm⁻¹");
    if (elements["C"] && elements["H"]) irBands.push("C-H stretch: 2850-3000 cm⁻¹");
    if (irBands.length === 0) irBands.push("Characteristic molecular vibrations");

    const uvvis = elements["C"] >= 3 ?
        "π→π* transitions: 200-400 nm\nPotential conjugated system" :
        "Electronic transitions based on molecular orbitals";

    const customData = {
        breakdown: breakdown.join(", "),
        mass: `${mass.toFixed(3)} g/mol`,
        ir: irBands.join("\n"),
        ms: `Molecular ion: m/z ${molecularIon}\nFragments: ${fragments.join(", ")}`,
        amn: `Total protons: ${Math.round(totalProtons)}\nTotal neutrons: ${Math.round(mass - totalProtons)}\nIsotopes: ${isotopes.join(", ")}`,
        uvvis: uvvis
    };

    displayCustomAnalysis(customData);
}

function displayCompoundAnalysis(formula) {
    const compoundResults = document.getElementById('compound-results');
    if (!compoundResults || !spectroscopyData[formula]) return;

    const data = spectroscopyData[formula];
    displayAnalysisResults(data);
}

function displayCustomAnalysis(data) {
    const compoundResults = document.getElementById('compound-results');
    if (!compoundResults) return;

    displayAnalysisResults(data);
}

function displayAnalysisResults(data) {
    const compoundResults = document.getElementById('compound-results');
    compoundResults.innerHTML = `
        <div class="spectroscopy-card">
            <div class="spectroscopy-title">Molecular Breakdown</div>
            <div class="spectroscopy-data">${data.breakdown}</div>
        </div>
        <div class="spectroscopy-card">
            <div class="spectroscopy-title">Molecular Mass</div>
            <div class="spectroscopy-data">${data.mass}</div>
        </div>
        <div class="spectroscopy-card">
            <div class="spectroscopy-title">IR Spectroscopy</div>
            <div class="spectroscopy-data">${data.ir.replace(/\n/g, '<br>')}</div>
        </div>
        <div class="spectroscopy-card">
            <div class="spectroscopy-title">Mass Spectrometry</div>
            <div class="spectroscopy-data">${data.ms.replace(/\n/g, '<br>')}</div>
        </div>
        <div class="spectroscopy-card">
            <div class="spectroscopy-title">Atomic Mass & Isotopes</div>
            <div class="spectroscopy-data">${data.amn.replace(/\n/g, '<br>')}</div>
        </div>
        <div class="spectroscopy-card">
            <div class="spectroscopy-title">UV-Vis Spectroscopy</div>
            <div class="spectroscopy-data">${data.uvvis.replace(/\n/g, '<br>')}</div>
        </div>
    `;
}

function clearCompoundAnalysis() {
    const compoundResults = document.getElementById('compound-results');
    if (compoundResults) {
        compoundResults.innerHTML = '';
    }
}

function updateStepsChart() {
    document.querySelectorAll('.chart-item').forEach(item => {
        item.classList.remove('current-system');
    });

    let totalAtoms = 0;
    selectedElements.forEach(item => {
        if (item.type === 'element') {
            totalAtoms += item.moles;
        } else {
            const atomCount = Object.values(item.elements).reduce((sum, count) => sum + count, 0);
            totalAtoms += atomCount * item.moles;
        }
    });

    if (totalAtoms === 0) return;

    let systemType = '';
    if (totalAtoms <= 2) systemType = 'diatomic';
    else if (totalAtoms <= 10) systemType = 'small';
    else if (totalAtoms <= 50) systemType = 'medium';
    else systemType = 'large';

    const chartElement = document.getElementById(`chart-${systemType}`);
    if (chartElement) {
        chartElement.classList.add('current-system');
    }

    const recommendedSteps = {
        'diatomic': 100,
        'small': 300,
        'medium': 500,
        'large': 1000
    }[systemType];

    const stepsInput = document.getElementById('simulation-steps');
    if (stepsInput && recommendedSteps) {
        stepsInput.value = recommendedSteps;
    }
}

function setupEventListeners() {
    const runSimulationBtn = document.getElementById('run-simulation');
    const resetSimulationBtn = document.getElementById('reset-simulation');
    const page1 = document.getElementById('page1');
    const analyzeCompoundBtn = document.getElementById('analyze-compound');

    if (runSimulationBtn) {
        runSimulationBtn.addEventListener('click', runSimulation);
    }

    if (resetSimulationBtn) {
        resetSimulationBtn.addEventListener('click', resetSimulation);
    }

    if (page1) {
        page1.addEventListener('click', startAnimation);
    }

    if (analyzeCompoundBtn) {
        analyzeCompoundBtn.addEventListener('click', analyzeCompound);
    }

    const compoundInput = document.getElementById('compound-input');
    if (compoundInput) {
        compoundInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                analyzeCompound();
            }
        });
    }
}

function analyzeCompound() {
    const compoundInput = document.getElementById('compound-input');
    const compoundResults = document.getElementById('compound-results');

    if (!compoundInput || !compoundResults) return;

    const formula = compoundInput.value.trim().toUpperCase();

    if (!formula) {
        updateReactionDisplay();
        return;
    }

    if (spectroscopyData[formula]) {
        displayCompoundAnalysis(formula);
    } else {
        compoundResults.innerHTML = `
            <div class="spectroscopy-card">
                <div class="spectroscopy-title">Analysis</div>
                <div class="spectroscopy-data">Compound ${formula} not found in database. Analysis will be shown for selected elements.</div>
            </div>
        `;
    }
}

function runSimulation() {
    if (selectedElements.length === 0) {
        alert('Please select at least one element or compound.');
        return;
    }

    const simulationSteps = parseInt(document.getElementById('simulation-steps').value) || 500;
    const loadingElement = document.getElementById('loading');

    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }

    setTimeout(() => {
        const finalEnergy = -(Math.random() * 10 + 1).toFixed(4);
        const stability = Math.random() > 0.3 ? 'Stable' : 'Unstable';
        const newElementPossibility = Math.random() > 0.8 ? 'Possible' : 'Unlikely';

        const finalEnergyElement = document.getElementById('final-energy');
        const optimizedGeometryElement = document.getElementById('optimized-geometry');
        const stabilityPredictionElement = document.getElementById('stability-prediction');
        const newElementElement = document.getElementById('new-element');

        if (finalEnergyElement) finalEnergyElement.textContent = `${finalEnergy} eV`;
        if (optimizedGeometryElement) optimizedGeometryElement.textContent = 'Optimized';
        if (stabilityPredictionElement) stabilityPredictionElement.textContent = stability;
        if (newElementElement) newElementElement.textContent = newElementPossibility;

        generateEnergyGraph(simulationSteps);
        renderMoleculeVisualization();

        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }, 2000);
}

function resetSimulation() {
    selectedElements = [];

    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('selected');
    });

    document.querySelectorAll('.compound-item').forEach(item => {
        item.classList.remove('selected');
    });

    updateSelectedElementsDisplay();
    updateStepsChart();
    updateReactionDisplay();

    const finalEnergyElement = document.getElementById('final-energy');
    const optimizedGeometryElement = document.getElementById('optimized-geometry');
    const stabilityPredictionElement = document.getElementById('stability-prediction');
    const newElementElement = document.getElementById('new-element');

    if (finalEnergyElement) finalEnergyElement.textContent = '-';
    if (optimizedGeometryElement) optimizedGeometryElement.textContent = '-';
    if (stabilityPredictionElement) stabilityPredictionElement.textContent = '-';
    if (newElementElement) newElementElement.textContent = '-';

    const canvas = document.getElementById('molecule-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const svg = document.getElementById('energy-graph-svg');
    if (svg) {
        svg.innerHTML = '';
    }
}

function generateEnergyGraph(steps) {
    const svg = document.getElementById('energy-graph-svg');
    if (!svg) return;

    svg.innerHTML = '';

    const width = svg.clientWidth || 600;
    const height = svg.clientHeight || 150;
    const padding = 40;

    const data = [];
    for (let i = 0; i <= steps; i += Math.ceil(steps / 50)) {
        data.push({
            step: i,
            energy: -Math.random() * 10 * Math.exp(-i / steps) - 1
        });
    }

    const xScale = (step) => padding + (step / steps) * (width - 2 * padding);
    const yScale = (energy) => padding + (1 - (energy + 11) / 11) * (height - 2 * padding);

    let pathData = `M ${xScale(data[0].step)} ${yScale(data[0].energy)}`;
    for (let i = 1; i < data.length; i++) {
        pathData += ` L ${xScale(data[i].step)} ${yScale(data[i].energy)}`;
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('class', 'graph-line');
    svg.appendChild(path);

    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', padding);
    xAxis.setAttribute('y1', height - padding);
    xAxis.setAttribute('x2', width - padding);
    xAxis.setAttribute('y2', height - padding);
    xAxis.setAttribute('class', 'graph-axis');
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', padding);
    yAxis.setAttribute('y1', padding);
    yAxis.setAttribute('x2', padding);
    yAxis.setAttribute('y2', height - padding);
    yAxis.setAttribute('class', 'graph-axis');
    svg.appendChild(yAxis);

    // Add axis labels
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', width / 2);
    xLabel.setAttribute('y', height - 10);
    xLabel.setAttribute('class', 'axis-label');
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.textContent = 'Simulation Steps';
    svg.appendChild(xLabel);

    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('x', 15);
    yLabel.setAttribute('y', height / 2);
    yLabel.setAttribute('class', 'axis-label');
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.setAttribute('transform', `rotate(-90, 15, ${height / 2})`);
    yLabel.textContent = 'Energy (eV)';
    svg.appendChild(yLabel);
}

function renderMoleculeVisualization() {
    const canvas = document.getElementById('molecule-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (selectedElements.length === 0) return;

    const atoms = [];
    selectedElements.forEach(item => {
        if (item.type === 'element') {
            for (let i = 0; i < Math.min(item.moles * 10, 50); i++) {
                atoms.push({
                    x: 50 + Math.random() * (canvas.width - 100),
                    y: 50 + Math.random() * (canvas.height - 100),
                    radius: 10 + item.moles,
                    color: getElementColor(item.category),
                    symbol: item.symbol
                });
            }
        } else {
            Object.entries(item.elements).forEach(([element, count]) => {
                const elementData = periodicTable.find(el => el.symbol === element);
                if (elementData) {
                    for (let i = 0; i < Math.min(count * item.moles * 5, 30); i++) {
                        atoms.push({
                            x: 50 + Math.random() * (canvas.width - 100),
                            y: 50 + Math.random() * (canvas.height - 100),
                            radius: 8 + item.moles,
                            color: getElementColor(elementData.category),
                            symbol: element
                        });
                    }
                }
            });
        }
    });

    atoms.forEach((atom, i) => {
        atoms.forEach((otherAtom, j) => {
            if (i < j) {
                const dx = atom.x - otherAtom.x;
                const dy = atom.y - otherAtom.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(atom.x, atom.y);
                    ctx.lineTo(otherAtom.x, otherAtom.y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }
        });
    });

    atoms.forEach(atom => {
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(atom.symbol, atom.x, atom.y);
    });
}

function getElementColor(category) {
    const colors = {
        1: '#ff6b6b', 2: '#ffa726', 3: '#ffd54f', 4: '#81c784',
        5: '#4dd0e1', 6: '#64b5f6', 7: '#ba68c8', 8: '#f06292',
        9: '#90a4ae', 10: '#78909c'
    };
    return colors[category] || '#cccccc';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing...");
    setupEventListeners();

    goToPage(1);

    window.resetEverything = function() {
        selectedElements = [];
        if (currentAnimationFrame) {
            cancelAnimationFrame(currentAnimationFrame);
            currentAnimationFrame = null;
        }
        goToPage(1);
    };
});