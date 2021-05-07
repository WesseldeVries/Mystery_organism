// global variables
const pArray = [];  //for storage of 30 specimen
let orgNum = 1;     //to give each new specimen a unique number

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, array) => {
  orgNum++;     //each next specimen will get a unique number
  return {
    specimenNum: number,
    dna: array,

    mutate () {
      const randomIndex = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (newBase === this.dna[randomIndex]){
        newBase = returnRandBase();
      };
      this.dna[randomIndex] = newBase;
    },

    compareDNA (organism) {
      const curOrg = this.dna;
      const othOrg = organism.dna;
      let similarBaseCount = 0;
      for (let i = 0; i < curOrg.length; i++){
        if (curOrg[i] === othOrg[i]) {
          similarBaseCount += 1;
        };
      };
      const similarPercentage = (similarBaseCount / 15 * 100).toFixed(2);
      //console.log(`Specimen #${this.specimenNum} and specimen #${organism.specimenNum} have ${similarPercentage}% DNA in common.`);
      return similarPercentage;
    },

    willLikelySurvive () {
      const cAndGOnly = this.dna.filter(item => item === 'C' || item === 'G');
      return cAndGOnly.length / this.dna.length >= 0.6;
    },

    complementStrand () {
      const complementDNA = [];
      this.dna.forEach(protein =>{
        switch(protein){
          case 'A':
            complementDNA.push('T');
            break;
          case 'T':
            complementDNA.push('A');
            break;
          case 'C':
            complementDNA.push('G');
            break;
          case 'G':
            complementDNA.push('C');
            break;
          default:
            console.log('No valid protein found.');
            break;
        };
      });
      return complementDNA;
    },
  };
};

// create new specimen and add it only if likely to survive
const arrayMaker = () => {
  const newOrganism = pAequorFactory(orgNum, mockUpStrand());
  if (newOrganism.willLikelySurvive() === true) {
    pArray.push(newOrganism);
  } else {
    orgNum--;     //if false: undo addition for unique specimen number
  };
};

//add new specimen to array until length of 30
while (pArray.length < 30) {
  arrayMaker();
};

const findMostRelated = array => {
  let mostRelated = 0;
  let mostRelatedSpecimen = [];

  for (let i = 0; i < array.length; i){
    for (let j = 0; j < array.length; j++){
      if (array[i].dna != array[j].dna){
        if (array[i].compareDNA(array[j]) > mostRelated){
          mostRelatedSpecimen = [[array[i],array[j]]];
          mostRelated = array[i].compareDNA(array[j]);
        } else if (array[i].compareDNA(array[j]) === mostRelated){
          mostRelatedSpecimen.push([array[i],array[j]]);
        };
      };
    };
    array.shift();
  };

  mostRelatedSpecimen.forEach(combo => {
    console.log(`Specimen #${combo[0].specimenNum} and specimen #${combo[1].specimenNum} share ${mostRelated}% of their DNA.`);
    if (mostRelated > 72.00){
      console.log(combo[0].dna.join(''));
      console.log(combo[1].dna.join(''));
    };
  });
};

findMostRelated(pArray);



//print out DNA strand of all specimen
/*pArray.forEach(item => {
  console.log(item.dna.join(''));
});

const org1 = pAequorFactory(orgNum, mockUpStrand());
const org2 = pAequorFactory(orgNum, mockUpStrand());
console.log(org1.dna.join(''));
//console.log(org1.willLikelySurvive());
//console.log(org2.dna.join(''));
//console.log(org2.willLikelySurvive());
//org1.compareDNA(org2);
org1.mutate();
console.log(org1.dna.join(''));
console.log(org1.complementStrand().join(''));*/

return;