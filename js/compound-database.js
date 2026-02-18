function generateCompoundDatabase() {
    const commonCompounds = {
        // Water and related
        "H2O": { formula: "H₂O", name: "Water", elements: { "H": 2, "O": 1 } },
        "H2O2": { formula: "H₂O₂", name: "Hydrogen Peroxide", elements: { "H": 2, "O": 2 } },
        "D2O": { formula: "D₂O", name: "Heavy Water", elements: { "H": 2, "O": 1 } },

        // Carbon oxides
        "CO": { formula: "CO", name: "Carbon Monoxide", elements: { "C": 1, "O": 1 } },
        "CO2": { formula: "CO₂", name: "Carbon Dioxide", elements: { "C": 1, "O": 2 } },
        "C3O2": { formula: "C₃O₂", name: "Carbon Suboxide", elements: { "C": 3, "O": 2 } },

        // Nitrogen compounds
        "NH3": { formula: "NH₃", name: "Ammonia", elements: { "N": 1, "H": 3 } },
        "N2H4": { formula: "N₂H₄", name: "Hydrazine", elements: { "N": 2, "H": 4 } },
        "NH2OH": { formula: "NH₂OH", name: "Hydroxylamine", elements: { "N": 1, "H": 3, "O": 1 } },
        "N2O": { formula: "N₂O", name: "Nitrous Oxide", elements: { "N": 2, "O": 1 } },
        "NO": { formula: "NO", name: "Nitric Oxide", elements: { "N": 1, "O": 1 } },
        "NO2": { formula: "NO₂", name: "Nitrogen Dioxide", elements: { "N": 1, "O": 2 } },
        "N2O3": { formula: "N₂O₃", name: "Dinitrogen Trioxide", elements: { "N": 2, "O": 3 } },
        "N2O4": { formula: "N₂O₄", name: "Dinitrogen Tetroxide", elements: { "N": 2, "O": 4 } },
        "N2O5": { formula: "N₂O₅", name: "Dinitrogen Pentoxide", elements: { "N": 2, "O": 5 } },

        // Hydrocarbons - Alkanes
        "CH4": { formula: "CH₄", name: "Methane", elements: { "C": 1, "H": 4 } },
        "C2H6": { formula: "C₂H₆", name: "Ethane", elements: { "C": 2, "H": 6 } },
        "C3H8": { formula: "C₃H₈", name: "Propane", elements: { "C": 3, "H": 8 } },
        "C4H10": { formula: "C₄H₁₀", name: "Butane", elements: { "C": 4, "H": 10 } },
        "C5H12": { formula: "C₅H₁₂", name: "Pentane", elements: { "C": 5, "H": 12 } },
        "C6H14": { formula: "C₆H₁₄", name: "Hexane", elements: { "C": 6, "H": 14 } },
        "C7H16": { formula: "C₇H₁₆", name: "Heptane", elements: { "C": 7, "H": 16 } },
        "C8H18": { formula: "C₈H₁₈", name: "Octane", elements: { "C": 8, "H": 18 } },
        "C9H20": { formula: "C₉H₂₀", name: "Nonane", elements: { "C": 9, "H": 20 } },
        "C10H22": { formula: "C₁₀H₂₂", name: "Decane", elements: { "C": 10, "H": 22 } },

        // Alkenes
        "C2H4": { formula: "C₂H₄", name: "Ethene", elements: { "C": 2, "H": 4 } },
        "C3H6": { formula: "C₃H₆", name: "Propene", elements: { "C": 3, "H": 6 } },
        "C4H8": { formula: "C₄H₈", name: "Butene", elements: { "C": 4, "H": 8 } },
        "C5H10": { formula: "C₅H₁₀", name: "Pentene", elements: { "C": 5, "H": 10 } },
        "C6H12": { formula: "C₆H₁₂", name: "Hexene", elements: { "C": 6, "H": 12 } },

        // Alkynes
        "C2H2": { formula: "C₂H₂", name: "Ethyne", elements: { "C": 2, "H": 2 } },
        "C3H4": { formula: "C₃H₄", name: "Propyne", elements: { "C": 3, "H": 4 } },
        "C4H6": { formula: "C₄H₆", name: "Butyne", elements: { "C": 4, "H": 6 } },

        // Aromatic hydrocarbons
        "C6H6": { formula: "C₆H₆", name: "Benzene", elements: { "C": 6, "H": 6 } },
        "C7H8": { formula: "C₇H₈", name: "Toluene", elements: { "C": 7, "H": 8 } },
        "C8H10": { formula: "C₈H₁₀", name: "Xylene", elements: { "C": 8, "H": 10 } },
        "C10H8": { formula: "C₁₀H₈", name: "Naphthalene", elements: { "C": 10, "H": 8 } },
        "C14H10": { formula: "C₁₄H₁₀", name: "Anthracene", elements: { "C": 14, "H": 10 } },

        // Alcohols
        "CH3OH": { formula: "CH₃OH", name: "Methanol", elements: { "C": 1, "H": 4, "O": 1 } },
        "C2H5OH": { formula: "C₂H₅OH", name: "Ethanol", elements: { "C": 2, "H": 6, "O": 1 } },
        "C3H7OH": { formula: "C₃H₇OH", name: "Propanol", elements: { "C": 3, "H": 8, "O": 1 } },
        "C4H9OH": { formula: "C₄H₉OH", name: "Butanol", elements: { "C": 4, "H": 10, "O": 1 } },

        // Carboxylic acids
        "HCOOH": { formula: "HCOOH", name: "Formic Acid", elements: { "C": 1, "H": 2, "O": 2 } },
        "CH3COOH": { formula: "CH₃COOH", name: "Acetic Acid", elements: { "C": 2, "H": 4, "O": 2 } },
        "C2H4O2": { formula: "C₂H₄O₂", name: "Acetic Acid", elements: { "C": 2, "H": 4, "O": 2 } },
        "C3H6O2": { formula: "C₃H₆O₂", name: "Propionic Acid", elements: { "C": 3, "H": 6, "O": 2 } },
        "C4H8O2": { formula: "C₄H₈O₂", name: "Butyric Acid", elements: { "C": 4, "H": 8, "O": 2 } },

        // Aldehydes and Ketones
        "HCHO": { formula: "HCHO", name: "Formaldehyde", elements: { "C": 1, "H": 2, "O": 1 } },
        "CH3CHO": { formula: "CH₃CHO", name: "Acetaldehyde", elements: { "C": 2, "H": 4, "O": 1 } },
        "CH3COCH3": { formula: "CH₃COCH₃", name: "Acetone", elements: { "C": 3, "H": 6, "O": 1 } },

        // Esters
        "CH3COOCH3": { formula: "CH₃COOCH₃", name: "Methyl Acetate", elements: { "C": 3, "H": 6, "O": 2 } },
        "CH3COOC2H5": { formula: "CH₃COOC₂H₅", name: "Ethyl Acetate", elements: { "C": 4, "H": 8, "O": 2 } },

        // Ethers
        "C2H5OC2H5": { formula: "C₂H₅OC₂H₅", name: "Diethyl Ether", elements: { "C": 4, "H": 10, "O": 1 } },

        // Amines
        "CH3NH2": { formula: "CH₃NH₂", name: "Methylamine", elements: { "C": 1, "H": 5, "N": 1 } },
        "C2H5NH2": { formula: "C₂H₅NH₂", name: "Ethylamine", elements: { "C": 2, "H": 7, "N": 1 } },
        "C6H5NH2": { formula: "C₆H₅NH₂", name: "Aniline", elements: { "C": 6, "H": 7, "N": 1 } },

        // Halogen compounds
        "CH3Cl": { formula: "CH₃Cl", name: "Chloromethane", elements: { "C": 1, "H": 3, "Cl": 1 } },
        "CH2Cl2": { formula: "CH₂Cl₂", name: "Dichloromethane", elements: { "C": 1, "H": 2, "Cl": 2 } },
        "CHCl3": { formula: "CHCl₃", name: "Chloroform", elements: { "C": 1, "H": 1, "Cl": 3 } },
        "CCl4": { formula: "CCl₄", name: "Carbon Tetrachloride", elements: { "C": 1, "Cl": 4 } },
        "C2H5Cl": { formula: "C₂H₅Cl", name: "Chloroethane", elements: { "C": 2, "H": 5, "Cl": 1 } },

        // Sulfur compounds
        "H2S": { formula: "H₂S", name: "Hydrogen Sulfide", elements: { "H": 2, "S": 1 } },
        "SO2": { formula: "SO₂", name: "Sulfur Dioxide", elements: { "S": 1, "O": 2 } },
        "SO3": { formula: "SO₃", name: "Sulfur Trioxide", elements: { "S": 1, "O": 3 } },
        "H2SO4": { formula: "H₂SO₄", name: "Sulfuric Acid", elements: { "H": 2, "S": 1, "O": 4 } },
        "CS2": { formula: "CS₂", name: "Carbon Disulfide", elements: { "C": 1, "S": 2 } },

        // Phosphorus compounds
        "PH3": { formula: "PH₃", name: "Phosphine", elements: { "P": 1, "H": 3 } },
        "P4O10": { formula: "P₄O₁₀", name: "Phosphorus Pentoxide", elements: { "P": 4, "O": 10 } },
        "H3PO4": { formula: "H₃PO₄", name: "Phosphoric Acid", elements: { "H": 3, "P": 1, "O": 4 } },

        // Silicon compounds
        "SiH4": { formula: "SiH₄", name: "Silane", elements: { "Si": 1, "H": 4 } },
        "SiO2": { formula: "SiO₂", name: "Silicon Dioxide", elements: { "Si": 1, "O": 2 } },
        "SiC": { formula: "SiC", name: "Silicon Carbide", elements: { "Si": 1, "C": 1 } },

        // Inorganic acids
        "HCl": { formula: "HCl", name: "Hydrochloric Acid", elements: { "H": 1, "Cl": 1 } },
        "HBr": { formula: "HBr", name: "Hydrobromic Acid", elements: { "H": 1, "Br": 1 } },
        "HI": { formula: "HI", name: "Hydroiodic Acid", elements: { "H": 1, "I": 1 } },
        "HCN": { formula: "HCN", name: "Hydrogen Cyanide", elements: { "H": 1, "C": 1, "N": 1 } },
        "HNO3": { formula: "HNO₃", name: "Nitric Acid", elements: { "H": 1, "N": 1, "O": 3 } },
        "H2CO3": { formula: "H₂CO₃", name: "Carbonic Acid", elements: { "H": 2, "C": 1, "O": 3 } },

        // Bases
        "NaOH": { formula: "NaOH", name: "Sodium Hydroxide", elements: { "Na": 1, "O": 1, "H": 1 } },
        "KOH": { formula: "KOH", name: "Potassium Hydroxide", elements: { "K": 1, "O": 1, "H": 1 } },
        "Ca(OH)2": { formula: "Ca(OH)₂", name: "Calcium Hydroxide", elements: { "Ca": 1, "O": 2, "H": 2 } },
        "NH4OH": { formula: "NH₄OH", name: "Ammonium Hydroxide", elements: { "N": 1, "H": 5, "O": 1 } },

        // Salts
        "NaCl": { formula: "NaCl", name: "Sodium Chloride", elements: { "Na": 1, "Cl": 1 } },
        "KCl": { formula: "KCl", name: "Potassium Chloride", elements: { "K": 1, "Cl": 1 } },
        "CaCl2": { formula: "CaCl₂", name: "Calcium Chloride", elements: { "Ca": 1, "Cl": 2 } },
        "Na2CO3": { formula: "Na₂CO₃", name: "Sodium Carbonate", elements: { "Na": 2, "C": 1, "O": 3 } },
        "NaHCO3": { formula: "NaHCO₃", name: "Sodium Bicarbonate", elements: { "Na": 1, "H": 1, "C": 1, "O": 3 } },
        "CaCO3": { formula: "CaCO₃", name: "Calcium Carbonate", elements: { "Ca": 1, "C": 1, "O": 3 } },
        "CuSO4": { formula: "CuSO₄", name: "Copper Sulfate", elements: { "Cu": 1, "S": 1, "O": 4 } },
        "FeSO4": { formula: "FeSO₄", name: "Iron(II) Sulfate", elements: { "Fe": 1, "S": 1, "O": 4 } },
        "AgNO3": { formula: "AgNO₃", name: "Silver Nitrate", elements: { "Ag": 1, "N": 1, "O": 3 } },

        // Oxides
        "H2O": { formula: "H₂O", name: "Water", elements: { "H": 2, "O": 1 } },
        "Li2O": { formula: "Li₂O", name: "Lithium Oxide", elements: { "Li": 2, "O": 1 } },
        "Na2O": { formula: "Na₂O", name: "Sodium Oxide", elements: { "Na": 2, "O": 1 } },
        "K2O": { formula: "K₂O", name: "Potassium Oxide", elements: { "K": 2, "O": 1 } },
        "MgO": { formula: "MgO", name: "Magnesium Oxide", elements: { "Mg": 1, "O": 1 } },
        "CaO": { formula: "CaO", name: "Calcium Oxide", elements: { "Ca": 1, "O": 1 } },
        "Al2O3": { formula: "Al₂O₃", name: "Aluminum Oxide", elements: { "Al": 2, "O": 3 } },
        "Fe2O3": { formula: "Fe₂O₃", name: "Iron(III) Oxide", elements: { "Fe": 2, "O": 3 } },
        "Fe3O4": { formula: "Fe₃O₄", name: "Iron(II,III) Oxide", elements: { "Fe": 3, "O": 4 } },
        "CuO": { formula: "CuO", name: "Copper(II) Oxide", elements: { "Cu": 1, "O": 1 } },
        "Cu2O": { formula: "Cu₂O", name: "Copper(I) Oxide", elements: { "Cu": 2, "O": 1 } },
        "ZnO": { formula: "ZnO", name: "Zinc Oxide", elements: { "Zn": 1, "O": 1 } },
        "PbO": { formula: "PbO", name: "Lead(II) Oxide", elements: { "Pb": 1, "O": 1 } },
        "PbO2": { formula: "PbO₂", name: "Lead(IV) Oxide", elements: { "Pb": 1, "O": 2 } },
        "MnO2": { formula: "MnO₂", name: "Manganese Dioxide", elements: { "Mn": 1, "O": 2 } },
        "Cr2O3": { formula: "Cr₂O₃", name: "Chromium(III) Oxide", elements: { "Cr": 2, "O": 3 } },
        "TiO2": { formula: "TiO₂", name: "Titanium Dioxide", elements: { "Ti": 1, "O": 2 } },

        // Sugars and carbohydrates
        "C6H12O6": { formula: "C₆H₁₂O₆", name: "Glucose", elements: { "C": 6, "H": 12, "O": 6 } },
        "C12H22O11": { formula: "C₁₂H₂₂O₁₁", name: "Sucrose", elements: { "C": 12, "H": 22, "O": 11 } },
        "C6H10O5": { formula: "C₆H₁₀O₅", name: "Cellulose", elements: { "C": 6, "H": 10, "O": 5 } },

        // Amino acids
        "C3H7NO2": { formula: "C₃H₇NO₂", name: "Alanine", elements: { "C": 3, "H": 7, "N": 1, "O": 2 } },
        "C6H14N4O2": { formula: "C₆H₁₄N₄O₂", name: "Arginine", elements: { "C": 6, "H": 14, "N": 4, "O": 2 } },
        "C4H8N2O3": { formula: "C₄H₈N₂O₃", name: "Asparagine", elements: { "C": 4, "H": 8, "N": 2, "O": 3 } },
        "C4H7NO4": { formula: "C₄H₇NO₄", name: "Aspartic Acid", elements: { "C": 4, "H": 7, "N": 1, "O": 4 } },
        "C6H9N3O2": { formula: "C₆H₉N₃O₂", name: "Histidine", elements: { "C": 6, "H": 9, "N": 3, "O": 2 } },
        "C6H13NO2": { formula: "C₆H₁₃NO₂", name: "Leucine", elements: { "C": 6, "H": 13, "N": 1, "O": 2 } },
        "C5H11NO2S": { formula: "C₅H₁₁NO₂S", name: "Methionine", elements: { "C": 5, "H": 11, "N": 1, "O": 2, "S": 1 } },
        "C9H11NO2": { formula: "C₉H₁₁NO₂", name: "Phenylalanine", elements: { "C": 9, "H": 11, "N": 1, "O": 2 } },
        "C5H9NO2": { formula: "C₅H₉NO₂", name: "Proline", elements: { "C": 5, "H": 9, "N": 1, "O": 2 } },
        "C3H7NO3": { formula: "C₃H₇NO₃", name: "Serine", elements: { "C": 3, "H": 7, "N": 1, "O": 3 } },
        "C4H9NO3": { formula: "C₄H₉NO₃", name: "Threonine", elements: { "C": 4, "H": 9, "N": 1, "O": 3 } },
        "C11H12N2O2": { formula: "C₁₁H₁₂N₂O₂", name: "Tryptophan", elements: { "C": 11, "H": 12, "N": 2, "O": 2 } },
        "C9H11NO3": { formula: "C₉H₁₁NO₃", name: "Tyrosine", elements: { "C": 9, "H": 11, "N": 1, "O": 3 } },
        "C5H11NO2": { formula: "C₅H₁₁NO₂", name: "Valine", elements: { "C": 5, "H": 11, "N": 1, "O": 2 } },

        // Vitamins
        "C6H8O6": { formula: "C₆H₈O₆", name: "Vitamin C", elements: { "C": 6, "H": 8, "O": 6 } },
        "C12H17N4OS": { formula: "C₁₂H₁₇N₄OS", name: "Vitamin B1", elements: { "C": 12, "H": 17, "N": 4, "O": 1, "S": 1 } },
        "C17H20N4O6": { formula: "C₁₇H₂₀N₄O₆", name: "Vitamin B2", elements: { "C": 17, "H": 20, "N": 4, "O": 6 } },
        "C8H11NO2": { formula: "C₈H₁₁NO₂", name: "Vitamin B6", elements: { "C": 8, "H": 11, "N": 1, "O": 2 } },
        "C63H88CoN14O14P": { formula: "C₆₃H₈₈CoN₁₄O₁₄P", name: "Vitamin B12", elements: { "C": 63, "H": 88, "Co": 1, "N": 14, "O": 14, "P": 1 } },
        "C27H44O": { formula: "C₂₇H₄₄O", name: "Vitamin D", elements: { "C": 27, "H": 44, "O": 1 } },
        "C29H50O2": { formula: "C₂₉H₅₀O₂", name: "Vitamin E", elements: { "C": 29, "H": 50, "O": 2 } },
        "C31H46O2": { formula: "C₃₁H₄₆O₂", name: "Vitamin K", elements: { "C": 31, "H": 46, "O": 2 } },

        // Pharmaceuticals
        "C9H8O4": { formula: "C₉H₈O₄", name: "Aspirin", elements: { "C": 9, "H": 8, "O": 4 } },
        "C13H18O2": { formula: "C₁₃H₁₈O₂", name: "Ibuprofen", elements: { "C": 13, "H": 18, "O": 2 } },
        "C17H19NO3": { formula: "C₁₇H₁₉NO₃", name: "Morphine", elements: { "C": 17, "H": 19, "N": 1, "O": 3 } },
        "C21H30O2": { formula: "C₂₁H₃₀O₂", name: "Cannabidiol", elements: { "C": 21, "H": 30, "O": 2 } },
        "C10H13N5O4": { formula: "C₁₀H₁₃N₅O₄", name: "Adenosine", elements: { "C": 10, "H": 13, "N": 5, "O": 4 } },
        "C8H10N4O2": { formula: "C₈H₁₀N₄O₂", name: "Caffeine", elements: { "C": 8, "H": 10, "N": 4, "O": 2 } },
        "C20H25N3O": { formula: "C₂₀H₂₅N₃O", name: "LSD", elements: { "C": 20, "H": 25, "N": 3, "O": 1 } },

        // Explosives
        "C3H6N6O6": { formula: "C₃H₆N₆O₆", name: "RDX", elements: { "C": 3, "H": 6, "N": 6, "O": 6 } },
        "C7H5N3O6": { formula: "C₇H₅N₃O₆", name: "TNT", elements: { "C": 7, "H": 5, "N": 3, "O": 6 } },
        "C3H5N3O9": { formula: "C₃H₅N₃O₉", name: "Nitroglycerin", elements: { "C": 3, "H": 5, "N": 3, "O": 9 } },

        // Biochemical compounds
        "C21H36N7O16P3S": { formula: "C₂₁H₃₆N₇O₁₆P₃S", name: "Coenzyme A", elements: { "C": 21, "H": 36, "N": 7, "O": 16, "P": 3, "S": 1 } },
        "C10H16N5O13P3": { formula: "C₁₀H₁₆N₅O₁₃P₃", name: "ATP", elements: { "C": 10, "H": 16, "N": 5, "O": 13, "P": 3 } },
        "C10H15N5O10P2": { formula: "C₁₀H₁₅N₅O₁₀P₂", name: "ADP", elements: { "C": 10, "H": 15, "N": 5, "O": 10, "P": 2 } },
        "C10H14N5O7P": { formula: "C₁₀H₁₄N₅O₇P", name: "AMP", elements: { "C": 10, "H": 14, "N": 5, "O": 7, "P": 1 } },

        // Natural products
        "C17H35COOH": { formula: "C₁₇H₃₅COOH", name: "Stearic Acid", elements: { "C": 18, "H": 36, "O": 2 } },
        "C15H31COOH": { formula: "C₁₅H₃₁COOH", name: "Palmitic Acid", elements: { "C": 16, "H": 32, "O": 2 } },
        "C17H33COOH": { formula: "C₁₇H₃₃COOH", name: "Oleic Acid", elements: { "C": 18, "H": 34, "O": 2 } },
        "C17H31COOH": { formula: "C₁₇H₃₁COOH", name: "Linoleic Acid", elements: { "C": 18, "H": 32, "O": 2 } },
        "C17H29COOH": { formula: "C₁₇H₂₉COOH", name: "Linolenic Acid", elements: { "C": 18, "H": 30, "O": 2 } },
        "C20H30O": { formula: "C₂₀H₃₀O", name: "Retinol", elements: { "C": 20, "H": 30, "O": 1 } },
        "C27H46O": { formula: "C₂₇H₄₆O", name: "Cholesterol", elements: { "C": 27, "H": 46, "O": 1 } },
        "C55H72MgN4O5": { formula: "C₅₅H₇₂MgN₄O₅", name: "Chlorophyll a", elements: { "C": 55, "H": 72, "Mg": 1, "N": 4, "O": 5 } },
        "C55H70MgN4O6": { formula: "C₅₅H₇₀MgN₄O₆", name: "Chlorophyll b", elements: { "C": 55, "H": 70, "Mg": 1, "N": 4, "O": 6 } },
        "C40H56": { formula: "C₄₀H₅₆", name: "Carotene", elements: { "C": 40, "H": 56 } },
        "C40H56O2": { formula: "C₄₀H₅₆O₂", name: "Xanthophyll", elements: { "C": 40, "H": 56, "O": 2 } },

        // Additional common compounds
        "C2H2": { formula: "C₂H₂", name: "Acetylene", elements: { "C": 2, "H": 2 } },
        "C6H5OH": { formula: "C₆H₅OH", name: "Phenol", elements: { "C": 6, "H": 6, "O": 1 } },
        "C6H5NO2": { formula: "C₆H₅NO₂", name: "Nitrobenzene", elements: { "C": 6, "H": 5, "N": 1, "O": 2 } },
        "C7H6O2": { formula: "C₇H₆O₂", name: "Benzaldehyde", elements: { "C": 7, "H": 6, "O": 2 } },
        "C7H6O3": { formula: "C₇H₆O₃", name: "Salicylic Acid", elements: { "C": 7, "H": 6, "O": 3 } },
        "C8H8O3": { formula: "C₈H₈O₃", name: "Vanillin", elements: { "C": 8, "H": 8, "O": 3 } },
        "C8H10N4O2": { formula: "C₈H₁₀N₄O₂", name: "Theobromine", elements: { "C": 8, "H": 10, "N": 4, "O": 2 } },
        "C10H8O": { formula: "C₁₀H₈O", name: "Naphthol", elements: { "C": 10, "H": 8, "O": 1 } },
        "C10H12O": { formula: "C₁₀H₁₂O", name: "Eugenol", elements: { "C": 10, "H": 12, "O": 1 } },
        "C10H16O": { formula: "C₁₀H₁₆O", name: "Camphor", elements: { "C": 10, "H": 16, "O": 1 } }
    };

    const database = { ...commonCompounds };
    let count = Object.keys(commonCompounds).length;

    // Generate additional hydrocarbons
    for (let c = 11; c <= 30; c++) {
        const h = 2 * c + 2;
        const key = `C${c}H${h}`;
        database[key] = {
            formula: `C${c}H${h}`,
            name: `Alkane C${c}H${h}`,
            elements: { "C": c, "H": h }
        };
        count++;
    }

    // Generate additional alkenes
    for (let c = 7; c <= 20; c++) {
        const h = 2 * c;
        const key = `C${c}H${h}`;
        database[key] = {
            formula: `C${c}H${h}`,
            name: `Alkene C${c}H${h}`,
            elements: { "C": c, "H": h }
        };
        count++;
    }

    // Generate additional alkynes
    for (let c = 5; c <= 15; c++) {
        const h = 2 * c - 2;
        const key = `C${c}H${h}`;
        database[key] = {
            formula: `C${c}H${h}`,
            name: `Alkyne C${c}H${h}`,
            elements: { "C": c, "H": h }
        };
        count++;
    }

    // Generate additional alcohols
    for (let c = 5; c <= 20; c++) {
        const h = 2 * c + 2;
        const key = `C${c}H${h}O`;
        database[key] = {
            formula: `C${c}H${h}O`,
            name: `Alcohol C${c}H${h}O`,
            elements: { "C": c, "H": h, "O": 1 }
        };
        count++;
    }

    // Generate additional carboxylic acids
    for (let c = 5; c <= 20; c++) {
        const h = 2 * c;
        const key = `C${c}H${h}O2`;
        database[key] = {
            formula: `C${c}H${h}O₂`,
            name: `Carboxylic Acid C${c}H${h}O₂`,
            elements: { "C": c, "H": h, "O": 2 }
        };
        count++;
    }

    // Generate additional aldehydes
    for (let c = 3; c <= 15; c++) {
        const h = 2 * c;
        const key = `C${c}H${h}O`;
        database[key] = {
            formula: `C${c}H${h}O`,
            name: `Aldehyde C${c}H${h}O`,
            elements: { "C": c, "H": h, "O": 1 }
        };
        count++;
    }

    // Generate additional ketones
    for (let c = 4; c <= 15; c++) {
        const h = 2 * c;
        const key = `C${c}H${h}O`;
        database[key] = {
            formula: `C${c}H${h}O`,
            name: `Ketone C${c}H${h}O`,
            elements: { "C": c, "H": h, "O": 1 }
        };
        count++;
    }

    // Generate additional esters
    for (let c = 3; c <= 15; c++) {
        const h = 2 * c;
        const key = `C${c}H${h}O2`;
        database[key] = {
            formula: `C${c}H${h}O₂`,
            name: `Ester C${c}H${h}O₂`,
            elements: { "C": c, "H": h, "O": 2 }
        };
        count++;
    }

    // Generate additional amines
    for (let c = 2; c <= 15; c++) {
        const h = 2 * c + 3;
        const key = `C${c}H${h}N`;
        database[key] = {
            formula: `C${c}H${h}N`,
            name: `Amine C${c}H${h}N`,
            elements: { "C": c, "H": h, "N": 1 }
        };
        count++;
    }

    // Generate additional amides
    for (let c = 2; c <= 15; c++) {
        const h = 2 * c + 1;
        const key = `C${c}H${h}NO`;
        database[key] = {
            formula: `C${c}H${h}NO`,
            name: `Amide C${c}H${h}NO`,
            elements: { "C": c, "H": h, "N": 1, "O": 1 }
        };
        count++;
    }

    // Generate additional nitriles
    for (let c = 2; c <= 15; c++) {
        const h = 2 * c - 1;
        const key = `C${c}H${h}N`;
        database[key] = {
            formula: `C${c}H${h}N`,
            name: `Nitrile C${c}H${h}N`,
            elements: { "C": c, "H": h, "N": 1 }
        };
        count++;
    }

    // Generate additional halogen compounds
    const halogens = ["F", "Cl", "Br", "I"];
    halogens.forEach(halogen => {
        for (let c = 1; c <= 10; c++) {
            for (let hCount = 1; hCount <= 2 * c + 1; hCount++) {
                const key = `C${c}H${hCount}${halogen}`;
                database[key] = {
                    formula: `C${c}H${hCount}${halogen}`,
                    name: `${halogen} Compound C${c}H${hCount}${halogen}`,
                    elements: { "C": c, "H": hCount, [halogen]: 1 }
                };
                count++;
            }
        }
    });

    console.log(`Generated ${count} unique compounds`);
    return database;
}

const compoundDatabase = generateCompoundDatabase();