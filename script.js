const tacheInput = document.getElementById("tacheInput");
const heureInput = document.getElementById("heureInput");
const categorieInput = document.getElementById("categorieInput");
const ajouterBtn = document.getElementById("ajouterBtn");
const tacheList = document.getElementById("tacheList");

// Charger tâches depuis localStorage
let taches = JSON.parse(localStorage.getItem("taches")) || [];
taches.forEach(t => ajouterTacheDOM(t));

// Ajouter une tâche
ajouterBtn.addEventListener("click", () => {
  const tache = tacheInput.value.trim();
  const heure = heureInput.value;
  const categorie = categorieInput.value;

  if (!tache || !heure) return;

  const couleur = categorieInput.options[categorieInput.selectedIndex].style.getPropertyValue('--color') || "#FFB6B9";
  const nouvelleTache = { tache, heure, categorie, couleur, complete: false };

  taches.push(nouvelleTache);
  localStorage.setItem("taches", JSON.stringify(taches));
  ajouterTacheDOM(nouvelleTache);

  tacheInput.value = "";
  heureInput.value = "";
});

// Ajouter tâche au DOM
function ajouterTacheDOM({ tache, heure, categorie, couleur, complete }) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span><span class="categorie" style="background:${couleur}">${categorie}</span>${heure} - ${tache}</span>
    <div>
      <input type="checkbox" ${complete ? "checked" : ""}>
      <button>Supprimer</button>
    </div>
  `;

  tacheList.appendChild(li);

  // Cocher tâche
  li.querySelector("input").addEventListener("change", (e) => {
    li.classList.toggle("completed");
    const index = Array.from(tacheList.children).indexOf(li);
    taches[index].complete = e.target.checked;
    localStorage.setItem("taches", JSON.stringify(taches));
  });

  // Supprimer tâche
  li.querySelector("button").addEventListener("click", () => {
    const index = Array.from(tacheList.children).indexOf(li);
    taches.splice(index, 1);
    localStorage.setItem("taches", JSON.stringify(taches));
    li.remove();
  });

  if (complete) li.classList.add("completed");
}
