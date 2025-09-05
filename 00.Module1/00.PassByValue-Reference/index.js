let quditchWinner = "HarryPotter";

//primitive type in js are passed by value
function changeWinner(quditchWinner) {
  quditchWinner = "DracoMalfoy";
  console.log("Inside function: " + quditchWinner);
}

console.log("Before function call: " + quditchWinner);
changeWinner(quditchWinner);
console.log("After function call: " + quditchWinner);

//non-primitive type in js are passed by reference
let team = {
  name: "HarryPotter",
};

function changeTeamName(team) {
  //   team["name"] = "dracoMalfoy";
  team.name = "DracoMalfoy";
  console.log("Inside function: " + team.name);
}

console.log("Before function call: " + team.name);
changeTeamName(team);
console.log("After function call: " + team.name);
