const input = document.createElement("input");
input.type = "file";
input.accept = ".txt";

document.body.appendChild(input);

const grade = [];

input.addEventListener("change", () => {
	const file = input.files[0];

	if (!file) return;

	const reader = new FileReader();

	reader.readAsText(file);

	reader.onload = () => {
		const row = reader.result.split(/\r?\n/);

		for (let i = row.length - 1; i >= 0; i--) {
			if (row[i].length === 0) {
				row.splice(i, 1);
			}
		}

		for (const elt of row) {
			const arr = elt.split(";").map(x => x.trim());

			for (let i = arr.length - 1; i >= 0; i--) {
				if (arr[i] === "") {
					arr.splice(i, 1);
				}
			}

			grade.push(arr);
		}

		document.body.removeChild(input);
		document.body.appendChild(div);

		generateScript(grade);
	}
});


const div = document.createElement("div");

const BEGIN = "<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;\">";
const END = "</div>";

const TEMPLATE = [
	["M", "Titolo"],
	["TB", "link", "Titolo"]
	["S", "Titolo", "www.link", "descrizione"],
	["U", "Titolo", "www.link"],
	["T", "Titolo"]
];

const generateBegin = () => BEGIN; 

const generateCode = (base, i) => {
	let script;

	//TITOLO
	if (base[0] == "M") {
		return "<h1 style=\"color: #111; border-bottom: 3px solid #333; padding-bottom: 10px; text-transform: uppercase; font-size: 26px; margin-top: 0; margin-bottom: 20px;\">" + base[1] + "</h1>\n<a></a>\n<a></a>";
	}

	//STUCK
	else if (base[0] == "S") {
		if (base[3] == "" || !base[3]) {
			return "<div style=\"background: #f4f6f7; padding: 12px 15px; border-left: 4px solid #35a5ff; border-radius: 0 4px 4px 0;\"><span style=\"background: #e1f5fe; color: #0288d1; padding: 2px 6px; border-radius: 4px; font-size: 1.1em; font-weight: bold; margin-right: 8px;\">" + i + ". </span><a href=\"" + base[1] + "\" style=\"color: #0288d1; font-size: 1.2em; text-decoration: none; font-weight: 500;\">" + base[2] + "</a></div>";
		}
			return "<div style=\"background: #f4f6f7; padding: 12px 15px; border-left: 4px solid #35a5ff; border-radius: 0 4px 4px 0;\"><span style=\"background: #e1f5fe; color: #0288d1; padding: 2px 6px; border-radius: 4px; font-size: 1.1em; font-weight: bold; margin-right: 8px;\">" + i + ". </span><a href=\"" + base[1] + "\" style=\"color: #0288d1; font-size: 1.2em; text-decoration: none; font-weight: 500;\">" + base[2] + "</a><span style=\"color: #666; font-size: 0.9em; font-style: italic; margin-left: 10px;\">– " + base[3] + "</span></div>";
	}

	//UBUNG
	else if (base[0] == "U") {
		return "<div style=\"background: #f4f6f7; padding: 12px 15px; border-left: 4px solid #35a5ff; border-radius: 0 4px 4px 0;\"><span style=\"background: #e1f5fe; color: #0288d1; padding: 2px 6px; border-radius: 4px; font-size: 1.1em; font-weight: bold; margin-right: 8px;\">" + i + ". ÜBUNG</span><a href=\"" + base[1] + "\" style=\"color: #0288d1; font-size: 1.2em; text-decoration: none; font-weight: 500;\">" + base[2] + "</a></div>";
	}

	//TRINITY
	else if (base[0] == "T") {
		return "<div style=\"background: #f4f6f7; padding: 12px 15px; border-left: 4px solid #35a5ff; border-radius: 0 4px 4px 0;\"><span style=\"background: #FEE2E2; color: #B91C1C; padding: 2px 6px; border-radius: 4px; font-size: 1.1em; font-weight: bold; margin-right: 8px;\">" + i + ". TRINITY </span><a style=\"color: #B91C1C; font-size: 1.2em; text-decoration: none; font-weight: 500;\">" + base[1] + "</a></div>";
	}

	//EMPFOHLENE
	else if (base[0] == "E") {
		return "<div style=\"background: #f4f6f7; padding: 12px 15px; border-radius: 0 4px 4px 0; margin-left: 30px\"><span style=\"background: #DCFCE7; color: #15803D; padding: 2px 6px; border-radius: 4px; font-size: 1.1em; font-weight: bold; font-style: italic; margin-right: 8px;\">Empfohlene Stücke: </span><a style=\"color: #15803D; font-size: 1.2em; text-decoration: none; font-weight: 500;\">" + base[1] + "</a></div>";
	}

	//TRINITY BUCH PDF
	else if (base[0] == "TB") {
		return "<div style=\"background: #f4f6f7; padding: 12px 15px; border-radius: 0 4px 4px 0; margin-left: 10px\"><a href=\"" + base[1] + "\" style=\"background: #FEE2E2; color: #B91C1C; padding: 2px 6px; border-radius: 4px; font-size: 1.1em; font-weight: bold; margin-right: 8px;\">" + base[2] + "</a>";
	}


	/*

	//STUCK
	else if (base[0] == "S") {
		return "<div style=\"background: #fff; padding: 12px 15px; border-left: 4px solid #3498db; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-radius: 0 4px 4px 0;\"><a href=\"" + base[1] + "\" style=\"color: #2980b9; text-decoration: none; font-weight: bold;\">" + i + ". " + base[2] + "</a><span style=\"color: #666; font-size: 0.9em; font-style: italic; margin-left: 10px;\">– " + base[3] + "</span></div>";
	}

	//UBUNG
	else if (base[0] == "U") {
		return "<div style=\"background: #f4f6f7; padding: 12px 15px; border-left: 4px solid #95a5a6; border-radius: 0 4px 4px 0;\"><span style=\"background: #e1f5fe; color: #0288d1; padding: 2px 6px; border-radius: 4px; font-size: 0.8em; font-weight: bold; margin-right: 8px;\">ÜBUNG</span><a href=\"" + base[1] + "\" style=\"color: #34495e; text-decoration: none; font-weight: 500;\">" + i + ". " + base[2] + "</a></div>";
	}

	else if (base[0] == "T") {
		return "<div style=\"background: #fff5f5; padding: 12px 15px; border-left: 4px solid #e74c3c; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-radius: 0 4px 4px 0; font-weight: bold; color: #c0392b;\">" + i + ". TRINITY STÜCK: " + i + ". " + base[1] + "</div>";
	}

	else if (base[0] == "E") {
		return "<div style=\"background: #f5fff5; padding: 12px 15px; border-left: 4px solid #e74c3c; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-radius: 0 4px 4px 0; font-weight: normal; font-style: italic; color: #39c02b;\"> Empfohlene Stücke: " + base[1] + "</div>";
	}
	*/

	return "ERROR";
}

const generateScript = (bases) => {
	div.style.whiteSpace = "pre-line";

	div.textContent = BEGIN + "\n\n";

	let i = -1;
	for (let base of bases) {
		i++;
		try {
			let script = generateCode(base, i);
			div.textContent += ("\t" + script + "\n\n");

			if (base[0] == "E" || base[0] == "TB") i--;

		} catch(err) {
			console.error(i + 2);
		}
	}

	div.textContent += (END + "\n");
}