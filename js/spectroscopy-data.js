function generateSpectroscopyData(compoundDatabase) {
    const spectroscopyData = {};

    const atomicMasses = {
        "H": 1.008, "He": 4.0026, "Li": 6.94, "Be": 9.0122, "B": 10.81,
        "C": 12.011, "N": 14.007, "O": 15.999, "F": 18.998, "Ne": 20.180,
        "Na": 22.990, "Mg": 24.305, "Al": 26.982, "Si": 28.085, "P": 30.974,
        "S": 32.06, "Cl": 35.45, "Ar": 39.948, "K": 39.098, "Ca": 40.078,
        "Sc": 44.956, "Ti": 47.867, "V": 50.942, "Cr": 51.996, "Mn": 54.938,
        "Fe": 55.845, "Co": 58.933, "Ni": 58.693, "Cu": 63.546, "Zn": 65.38,
        "Ga": 69.723, "Ge": 72.630, "As": 74.922, "Se": 78.971, "Br": 79.904,
        "Kr": 83.798, "Rb": 85.468, "Sr": 87.62, "Y": 88.906, "Zr": 91.224,
        "Nb": 92.906, "Mo": 95.95, "Tc": 98.0, "Ru": 101.07, "Rh": 102.91,
        "Pd": 106.42, "Ag": 107.87, "Cd": 112.41, "In": 114.82, "Sn": 118.71,
        "Sb": 121.76, "Te": 127.60, "I": 126.90, "Xe": 131.29, "Cs": 132.91,
        "Ba": 137.33, "La": 138.91, "Ce": 140.12, "Pr": 140.91, "Nd": 144.24,
        "Pm": 145.0, "Sm": 150.36, "Eu": 151.96, "Gd": 157.25, "Tb": 158.93,
        "Dy": 162.50, "Ho": 164.93, "Er": 167.26, "Tm": 168.93, "Yb": 173.05,
        "Lu": 174.97, "Hf": 178.49, "Ta": 180.95, "W": 183.84, "Re": 186.21,
        "Os": 190.23, "Ir": 192.22, "Pt": 195.08, "Au": 196.97, "Hg": 200.59,
        "Tl": 204.38, "Pb": 207.2, "Bi": 208.98, "Po": 209.0, "At": 210.0,
        "Rn": 222.0, "Fr": 223.0, "Ra": 226.0, "Ac": 227.0, "Th": 232.04,
        "Pa": 231.04, "U": 238.03, "Np": 237.0, "Pu": 244.0, "Am": 243.0,
        "Cm": 247.0, "Bk": 247.0, "Cf": 251.0, "Es": 252.0, "Fm": 257.0,
        "Md": 258.0, "No": 259.0, "Lr": 262.0, "Rf": 267.0, "Db": 268.0,
        "Sg": 271.0, "Bh": 272.0, "Hs": 270.0, "Mt": 276.0, "Ds": 281.0,
        "Rg": 280.0, "Cn": 285.0, "Nh": 286.0, "Fl": 289.0, "Mc": 290.0,
        "Lv": 293.0, "Ts": 294.0, "Og": 294.0
    };

    const isotopeData = {
        "H": { protons: 1, neutrons: 0, common: "¹H (99.98%), ²H (0.02%)" },
        "He": { protons: 2, neutrons: 2, common: "⁴He (99.99986%), ³He (0.00014%)" },
        "Li": { protons: 3, neutrons: 4, common: "⁷Li (92.41%), ⁶Li (7.59%)" },
        "Be": { protons: 4, neutrons: 5, common: "⁹Be (100%)" },
        "B": { protons: 5, neutrons: 6, common: "¹¹B (80.1%), ¹⁰B (19.9%)" },
        "C": { protons: 6, neutrons: 6, common: "¹²C (98.9%), ¹³C (1.1%)" },
        "N": { protons: 7, neutrons: 7, common: "¹⁴N (99.6%), ¹⁵N (0.4%)" },
        "O": { protons: 8, neutrons: 8, common: "¹⁶O (99.76%), ¹⁸O (0.2%)" },
        "F": { protons: 9, neutrons: 10, common: "¹⁹F (100%)" },
        "Ne": { protons: 10, neutrons: 10, common: "²⁰Ne (90.48%), ²²Ne (9.25%)" },
        "Na": { protons: 11, neutrons: 12, common: "²³Na (100%)" },
        "Mg": { protons: 12, neutrons: 12, common: "²⁴Mg (79%), ²⁶Mg (11%)" },
        "Al": { protons: 13, neutrons: 14, common: "²⁷Al (100%)" },
        "Si": { protons: 14, neutrons: 14, common: "²⁸Si (92.2%), ²⁹Si (4.7%)" },
        "P": { protons: 15, neutrons: 16, common: "³¹P (100%)" },
        "S": { protons: 16, neutrons: 16, common: "³²S (95%), ³⁴S (4.2%)" },
        "Cl": { protons: 17, neutrons: 18, common: "³⁵Cl (76%), ³⁷Cl (24%)" },
        "Ar": { protons: 18, neutrons: 22, common: "⁴⁰Ar (99.6%), ³⁶Ar (0.34%)" },
        "K": { protons: 19, neutrons: 20, common: "³⁹K (93.3%), ⁴¹K (6.7%)" },
        "Ca": { protons: 20, neutrons: 20, common: "⁴⁰Ca (97%), ⁴⁴Ca (2.1%)" },
        "Sc": { protons: 21, neutrons: 24, common: "⁴⁵Sc (100%)" },
        "Ti": { protons: 22, neutrons: 26, common: "⁴⁸Ti (74%), ⁴⁶Ti (8%)" },
        "V": { protons: 23, neutrons: 28, common: "⁵¹V (99.75%), ⁵⁰V (0.25%)" },
        "Cr": { protons: 24, neutrons: 28, common: "⁵²Cr (83.8%), ⁵³Cr (9.5%)" },
        "Mn": { protons: 25, neutrons: 30, common: "⁵⁵Mn (100%)" },
        "Fe": { protons: 26, neutrons: 30, common: "⁵⁶Fe (91.7%), ⁵⁴Fe (5.8%)" },
        "Co": { protons: 27, neutrons: 32, common: "⁵⁹Co (100%)" },
        "Ni": { protons: 28, neutrons: 31, common: "⁵⁸Ni (68.1%), ⁶⁰Ni (26.2%)" },
        "Cu": { protons: 29, neutrons: 35, common: "⁶³Cu (69.2%), ⁶⁵Cu (30.8%)" },
        "Zn": { protons: 30, neutrons: 35, common: "⁶⁴Zn (48.6%), ⁶⁶Zn (27.9%)" },
        "Ga": { protons: 31, neutrons: 39, common: "⁶⁹Ga (60.1%), ⁷¹Ga (39.9%)" },
        "Ge": { protons: 32, neutrons: 41, common: "⁷⁴Ge (36.7%), ⁷²Ge (27.4%)" },
        "As": { protons: 33, neutrons: 42, common: "⁷⁵As (100%)" },
        "Se": { protons: 34, neutrons: 45, common: "⁸⁰Se (49.6%), ⁷⁸Se (23.5%)" },
        "Br": { protons: 35, neutrons: 45, common: "⁷⁹Br (51%), ⁸¹Br (49%)" },
        "Kr": { protons: 36, neutrons: 48, common: "⁸⁴Kr (57%), ⁸⁶Kr (17.3%)" },
        "Rb": { protons: 37, neutrons: 48, common: "⁸⁵Rb (72.2%), ⁸⁷Rb (27.8%)" },
        "Sr": { protons: 38, neutrons: 50, common: "⁸⁸Sr (82.6%), ⁸⁶Sr (9.9%)" },
        "Y": { protons: 39, neutrons: 50, common: "⁸⁹Y (100%)" },
        "Zr": { protons: 40, neutrons: 51, common: "⁹⁰Zr (51.5%), ⁹⁴Zr (17.4%)" },
        "Nb": { protons: 41, neutrons: 52, common: "⁹³Nb (100%)" },
        "Mo": { protons: 42, neutrons: 54, common: "⁹⁸Mo (24.1%), ⁹⁶Mo (16.7%)" },
        "Tc": { protons: 43, neutrons: 55, common: "⁹⁸Tc (synthetic)" },
        "Ru": { protons: 44, neutrons: 57, common: "¹⁰²Ru (31.6%), ¹⁰⁴Ru (18.7%)" },
        "Rh": { protons: 45, neutrons: 58, common: "¹⁰³Rh (100%)" },
        "Pd": { protons: 46, neutrons: 60, common: "¹⁰⁶Pd (27.3%), ¹⁰⁸Pd (26.5%)" },
        "Ag": { protons: 47, neutrons: 61, common: "¹⁰⁷Ag (51.8%), ¹⁰⁹Ag (48.2%)" },
        "Cd": { protons: 48, neutrons: 64, common: "¹¹⁴Cd (28.7%), ¹¹²Cd (24.1%)" },
        "In": { protons: 49, neutrons: 66, common: "¹¹⁵In (95.7%), ¹¹³In (4.3%)" },
        "Sn": { protons: 50, neutrons: 69, common: "¹²⁰Sn (32.6%), ¹¹⁸Sn (24.2%)" },
        "Sb": { protons: 51, neutrons: 71, common: "¹²¹Sb (57.2%), ¹²³Sb (42.8%)" },
        "Te": { protons: 52, neutrons: 76, common: "¹³⁰Te (34.1%), ¹²⁸Te (31.7%)" },
        "I": { protons: 53, neutrons: 74, common: "¹²⁷I (100%)" },
        "Xe": { protons: 54, neutrons: 77, common: "¹³²Xe (26.9%), ¹²⁹Xe (26.4%)" },
        "Cs": { protons: 55, neutrons: 78, common: "¹³³Cs (100%)" },
        "Ba": { protons: 56, neutrons: 81, common: "¹³⁸Ba (71.7%), ¹³⁷Ba (11.2%)" },
        "La": { protons: 57, neutrons: 82, common: "¹³⁹La (99.9%)" },
        "Ce": { protons: 58, neutrons: 82, common: "¹⁴⁰Ce (88.5%), ¹⁴²Ce (11.1%)" },
        "Pr": { protons: 59, neutrons: 82, common: "¹⁴¹Pr (100%)" },
        "Nd": { protons: 60, neutrons: 84, common: "¹⁴²Nd (27.1%), ¹⁴⁴Nd (23.8%)" },
        "Pm": { protons: 61, neutrons: 84, common: "¹⁴⁵Pm (synthetic)" },
        "Sm": { protons: 62, neutrons: 88, common: "¹⁵²Sm (26.7%), ¹⁵⁴Sm (22.7%)" },
        "Eu": { protons: 63, neutrons: 89, common: "¹⁵³Eu (52.2%), ¹⁵¹Eu (47.8%)" },
        "Gd": { protons: 64, neutrons: 93, common: "¹⁵⁸Gd (24.8%), ¹⁶⁰Gd (21.9%)" },
        "Tb": { protons: 65, neutrons: 94, common: "¹⁵⁹Tb (100%)" },
        "Dy": { protons: 66, neutrons: 96, common: "¹⁶⁴Dy (28.2%), ¹⁶²Dy (25.5%)" },
        "Ho": { protons: 67, neutrons: 98, common: "¹⁶⁵Ho (100%)" },
        "Er": { protons: 68, neutrons: 99, common: "¹⁶⁶Er (33.6%), ¹⁶⁸Er (27.1%)" },
        "Tm": { protons: 69, neutrons: 100, common: "¹⁶⁹Tm (100%)" },
        "Yb": { protons: 70, neutrons: 103, common: "¹⁷⁴Yb (31.8%), ¹⁷²Yb (21.9%)" },
        "Lu": { protons: 71, neutrons: 104, common: "¹⁷⁵Lu (97.4%), ¹⁷⁶Lu (2.6%)" },
        "Hf": { protons: 72, neutrons: 106, common: "¹⁸⁰Hf (35.1%), ¹⁷⁸Hf (27.3%)" },
        "Ta": { protons: 73, neutrons: 108, common: "¹⁸¹Ta (99.99%)" },
        "W": { protons: 74, neutrons: 110, common: "¹⁸⁴W (30.6%), ¹⁸⁶W (28.4%)" },
        "Re": { protons: 75, neutrons: 111, common: "¹⁸⁷Re (62.6%), ¹⁸⁵Re (37.4%)" },
        "Os": { protons: 76, neutrons: 114, common: "¹⁹²Os (41%), ¹⁹⁰Os (26.4%)" },
        "Ir": { protons: 77, neutrons: 115, common: "¹⁹³Ir (62.7%), ¹⁹¹Ir (37.3%)" },
        "Pt": { protons: 78, neutrons: 117, common: "¹⁹⁵Pt (33.8%), ¹⁹⁴Pt (32.9%)" },
        "Au": { protons: 79, neutrons: 118, common: "¹⁹⁷Au (100%)" },
        "Hg": { protons: 80, neutrons: 121, common: "²⁰²Hg (29.9%), ²⁰⁰Hg (23.1%)" },
        "Tl": { protons: 81, neutrons: 123, common: "²⁰⁵Tl (70.5%), ²⁰³Tl (29.5%)" },
        "Pb": { protons: 82, neutrons: 125, common: "²⁰⁸Pb (52.4%), ²⁰⁶Pb (24.1%)" },
        "Bi": { protons: 83, neutrons: 126, common: "²⁰⁹Bi (100%)" },
        "Po": { protons: 84, neutrons: 125, common: "²⁰⁹Po (synthetic)" },
        "At": { protons: 85, neutrons: 125, common: "²¹⁰At (synthetic)" },
        "Rn": { protons: 86, neutrons: 136, common: "²²²Rn (natural)" },
        "Fr": { protons: 87, neutrons: 136, common: "²²³Fr (synthetic)" },
        "Ra": { protons: 88, neutrons: 138, common: "²²⁶Ra (natural)" },
        "Ac": { protons: 89, neutrons: 138, common: "²²⁷Ac (natural)" },
        "Th": { protons: 90, neutrons: 142, common: "²³²Th (100%)" },
        "Pa": { protons: 91, neutrons: 140, common: "²³¹Pa (natural)" },
        "U": { protons: 92, neutrons: 146, common: "²³⁸U (99.3%), ²³⁵U (0.7%)" },
        "Np": { protons: 93, neutrons: 144, common: "²³⁷Np (synthetic)" },
        "Pu": { protons: 94, neutrons: 150, common: "²⁴⁴Pu (synthetic)" },
        "Am": { protons: 95, neutrons: 148, common: "²⁴³Am (synthetic)" },
        "Cm": { protons: 96, neutrons: 151, common: "²⁴⁷Cm (synthetic)" },
        "Bk": { protons: 97, neutrons: 150, common: "²⁴⁷Bk (synthetic)" },
        "Cf": { protons: 98, neutrons: 153, common: "²⁵¹Cf (synthetic)" },
        "Es": { protons: 99, neutrons: 153, common: "²⁵²Es (synthetic)" },
        "Fm": { protons: 100, neutrons: 157, common: "²⁵⁷Fm (synthetic)" },
        "Md": { protons: 101, neutrons: 157, common: "²⁵⁸Md (synthetic)" },
        "No": { protons: 102, neutrons: 157, common: "²⁵⁹No (synthetic)" },
        "Lr": { protons: 103, neutrons: 159, common: "²⁶²Lr (synthetic)" },
        "Rf": { protons: 104, neutrons: 163, common: "²⁶⁷Rf (synthetic)" },
        "Db": { protons: 105, neutrons: 163, common: "²⁶⁸Db (synthetic)" },
        "Sg": { protons: 106, neutrons: 165, common: "²⁷¹Sg (synthetic)" },
        "Bh": { protons: 107, neutrons: 165, common: "²⁷²Bh (synthetic)" },
        "Hs": { protons: 108, neutrons: 162, common: "²⁷⁰Hs (synthetic)" },
        "Mt": { protons: 109, neutrons: 167, common: "²⁷⁶Mt (synthetic)" },
        "Ds": { protons: 110, neutrons: 171, common: "²⁸¹Ds (synthetic)" },
        "Rg": { protons: 111, neutrons: 169, common: "²⁸⁰Rg (synthetic)" },
        "Cn": { protons: 112, neutrons: 173, common: "²⁸⁵Cn (synthetic)" },
        "Nh": { protons: 113, neutrons: 173, common: "²⁸⁶Nh (synthetic)" },
        "Fl": { protons: 114, neutrons: 175, common: "²⁸⁹Fl (synthetic)" },
        "Mc": { protons: 115, neutrons: 175, common: "²⁹⁰Mc (synthetic)" },
        "Lv": { protons: 116, neutrons: 177, common: "²⁹³Lv (synthetic)" },
        "Ts": { protons: 117, neutrons: 177, common: "²⁹⁴Ts (synthetic)" },
        "Og": { protons: 118, neutrons: 176, common: "²⁹⁴Og (synthetic)" }
    };

    for (const [formula, compound] of Object.entries(compoundDatabase)) {
        const elements = compound.elements;

        let mass = 0;
        let breakdown = [];
        let totalProtons = 0;
        let totalNeutrons = 0;
        let isotopes = [];

        for (const [element, count] of Object.entries(elements)) {
            mass += atomicMasses[element] * count;
            breakdown.push(`${count} ${element}`);

            if (isotopeData[element]) {
                totalProtons += isotopeData[element].protons * count;
                totalNeutrons += isotopeData[element].neutrons * count;
                isotopes.push(isotopeData[element].common);
            } else {
                const atomicNumber = Object.keys(atomicMasses).indexOf(element) + 1;
                totalProtons += atomicNumber * count;
                totalNeutrons += Math.round((atomicMasses[element] - atomicNumber) * count);
                isotopes.push(`${element} (natural abundance)`);
            }
        }

        let irBands = [];
        if (elements["O"] && elements["H"]) {
            if (elements["O"] === 1 && elements["H"] === 2) {
                irBands.push("O-H stretch: 3200-3600 cm⁻¹", "H-O-H bend: 1640 cm⁻¹");
            } else if (elements["O"] >= 1 && elements["H"] >= 1) {
                irBands.push("O-H stretch: 3200-3600 cm⁻¹");
            }
        }
        if (elements["C"] && elements["O"]) {
            if (elements["O"] === 2 && elements["C"] === 1) {
                irBands.push("C=O stretch: 1700-1750 cm⁻¹");
            } else {
                irBands.push("C-O stretch: 1000-1300 cm⁻¹");
            }
        }
        if (elements["C"] && elements["H"]) {
            irBands.push("C-H stretch: 2850-3000 cm⁻¹");
        }
        if (elements["N"] && elements["H"]) {
            irBands.push("N-H stretch: 3300-3500 cm⁻¹");
        }
        if (elements["C"] && elements["C"] && elements["C"] >= 2) {
            irBands.push("C=C stretch: 1600-1680 cm⁻¹");
        }
        if (elements["C"] && elements["N"]) {
            irBands.push("C≡N stretch: 2200-2260 cm⁻¹");
        }
        if (irBands.length === 0) {
            irBands.push("Characteristic stretches based on molecular structure");
        }

        const molecularIon = Math.round(mass);
        let fragments = [];

        if (elements["C"] && elements["H"]) {
            if (elements["C"] === 1) {
                fragments.push("CH₃⁺ (m/z 15)");
            } else {
                fragments.push(`C${elements["C"]}H${elements["H"] - 1}⁺ (m/z ${molecularIon - 1})`);
            }
        }
        if (elements["O"]) {
            fragments.push(`M-O fragment (m/z ${molecularIon - 16})`);
        }
        if (elements["Cl"]) {
            fragments.push("M-Cl fragment pattern");
        }
        if (elements["Br"]) {
            fragments.push("M-Br fragment pattern");
        }
        if (fragments.length === 0) {
            fragments.push("Characteristic fragmentation pattern");
        }

        let uvvis = "";
        if (elements["C"] >= 6 && elements["H"] <= elements["C"] * 2) {
            uvvis = "π→π* transition: 200-400 nm\nAromatic/conjugated system absorption";
        } else if (elements["O"] || elements["N"]) {
            uvvis = "n→σ* transition: 150-250 nm\nWeak UV absorption";
        } else if (elements["C"] && elements["H"]) {
            uvvis = "σ→σ* transition: 120-180 nm\nNo significant visible absorption";
        } else {
            uvvis = "Electronic transitions based on molecular orbitals";
        }

        spectroscopyData[formula] = {
            breakdown: breakdown.join(", "),
            mass: `${mass.toFixed(3)} g/mol`,
            ir: irBands.join("\n"),
            ms: `Molecular ion: m/z ${molecularIon}\nFragments: ${fragments.join(", ")}`,
            amn: `Total protons: ${totalProtons}\nTotal neutrons: ${totalNeutrons}\nIsotopes: ${isotopes.join(", ")}`,
            uvvis: uvvis
        };
    }

    const specificData = {
        "H2O": {
            breakdown: "2 Hydrogen, 1 Oxygen",
            mass: "18.015 g/mol",
            ir: "O-H stretch: 3200-3600 cm⁻¹\nH-O-H bend: 1640 cm⁻¹",
            ms: "Molecular ion: m/z 18\nFragments: OH⁺ (m/z 17), O⁺ (m/z 16), H₂⁺ (m/z 2)",
            amn: "Total protons: 10\nTotal neutrons: 8\nIsotopes: ¹⁶O (99.76%), ¹⁸O (0.2%)",
            uvvis: "n→σ* transition: ~167 nm\nWeak absorption in UV region"
        }
    };

    return { ...spectroscopyData, ...specificData };
}

const spectroscopyData = generateSpectroscopyData(compoundDatabase);