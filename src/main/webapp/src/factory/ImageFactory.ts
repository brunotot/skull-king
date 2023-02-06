import escape from "./../assets/img/specials/escape.png";
import mermaid from "./../assets/img/specials/mermaid.png";
import pirateOrEscape from "./../assets/img/specials/pirate-or-escape.png";
import skullKing from "./../assets/img/specials/skull-king.png";
import pirateV1 from "./../assets/img/specials/pirate-1.png";
import pirateV2 from "./../assets/img/specials/pirate-2.png";
import pirateV3 from "./../assets/img/specials/pirate-3.png";
import pirateV4 from "./../assets/img/specials/pirate-4.png";
import pirateV5 from "./../assets/img/specials/pirate-5.png";

import black1 from "./../assets/img/colors/black-1.png";
import black2 from "./../assets/img/colors/black-2.png";
import black3 from "./../assets/img/colors/black-3.png";
import black4 from "./../assets/img/colors/black-4.png";
import black5 from "./../assets/img/colors/black-5.png";
import black6 from "./../assets/img/colors/black-6.png";
import black7 from "./../assets/img/colors/black-7.png";
import black8 from "./../assets/img/colors/black-8.png";
import black9 from "./../assets/img/colors/black-9.png";
import black10 from "./../assets/img/colors/black-10.png";
import black11 from "./../assets/img/colors/black-11.png";
import black12 from "./../assets/img/colors/black-12.png";
import black13 from "./../assets/img/colors/black-13.png";

import blue1 from "./../assets/img/colors/blue-1.png";
import blue2 from "./../assets/img/colors/blue-2.png";
import blue3 from "./../assets/img/colors/blue-3.png";
import blue4 from "./../assets/img/colors/blue-4.png";
import blue5 from "./../assets/img/colors/blue-5.png";
import blue6 from "./../assets/img/colors/blue-6.png";
import blue7 from "./../assets/img/colors/blue-7.png";
import blue8 from "./../assets/img/colors/blue-8.png";
import blue9 from "./../assets/img/colors/blue-9.png";
import blue10 from "./../assets/img/colors/blue-10.png";
import blue11 from "./../assets/img/colors/blue-11.png";
import blue12 from "./../assets/img/colors/blue-12.png";
import blue13 from "./../assets/img/colors/blue-13.png";

import red1 from "./../assets/img/colors/red-1.png";
import red2 from "./../assets/img/colors/red-2.png";
import red3 from "./../assets/img/colors/red-3.png";
import red4 from "./../assets/img/colors/red-4.png";
import red5 from "./../assets/img/colors/red-5.png";
import red6 from "./../assets/img/colors/red-6.png";
import red7 from "./../assets/img/colors/red-7.png";
import red8 from "./../assets/img/colors/red-8.png";
import red9 from "./../assets/img/colors/red-9.png";
import red10 from "./../assets/img/colors/red-10.png";
import red11 from "./../assets/img/colors/red-11.png";
import red12 from "./../assets/img/colors/red-12.png";
import red13 from "./../assets/img/colors/red-13.png";

import yellow1 from "./../assets/img/colors/yellow-1.png";
import yellow2 from "./../assets/img/colors/yellow-2.png";
import yellow3 from "./../assets/img/colors/yellow-3.png";
import yellow4 from "./../assets/img/colors/yellow-4.png";
import yellow5 from "./../assets/img/colors/yellow-5.png";
import yellow6 from "./../assets/img/colors/yellow-6.png";
import yellow7 from "./../assets/img/colors/yellow-7.png";
import yellow8 from "./../assets/img/colors/yellow-8.png";
import yellow9 from "./../assets/img/colors/yellow-9.png";
import yellow10 from "./../assets/img/colors/yellow-10.png";
import yellow11 from "./../assets/img/colors/yellow-11.png";
import yellow12 from "./../assets/img/colors/yellow-12.png";
import yellow13 from "./../assets/img/colors/yellow-13.png";

export type PirateVersionKeys = 1 | 2 | 3 | 4 | 5;
export type PirateVersionType = {
	[key in PirateVersionKeys]: string;
};

const pirateVersions: PirateVersionType = {
	1: pirateV1,
	2: pirateV2,
	3: pirateV3,
	4: pirateV4,
	5: pirateV5,
};

const specials = {
	escape,
	mermaid,
	pirateOrEscape,
	skullKing,
	pirate: pirateVersions,
};

const colors = {
	black: {
		1: black1,
		2: black2,
		3: black3,
		4: black4,
		5: black5,
		6: black6,
		7: black7,
		8: black8,
		9: black9,
		10: black10,
		11: black11,
		12: black12,
		13: black13,
	},
	blue: {
		1: blue1,
		2: blue2,
		3: blue3,
		4: blue4,
		5: blue5,
		6: blue6,
		7: blue7,
		8: blue8,
		9: blue9,
		10: blue10,
		11: blue11,
		12: blue12,
		13: blue13,
	},
	red: {
		1: red1,
		2: red2,
		3: red3,
		4: red4,
		5: red5,
		6: red6,
		7: red7,
		8: red8,
		9: red9,
		10: red10,
		11: red11,
		12: red12,
		13: red13,
	},
	yellow: {
		1: yellow1,
		2: yellow2,
		3: yellow3,
		4: yellow4,
		5: yellow5,
		6: yellow6,
		7: yellow7,
		8: yellow8,
		9: yellow9,
		10: yellow10,
		11: yellow11,
		12: yellow12,
		13: yellow13,
	},
};

const ImageFactory = {
	specials,
	colors,
};

export default ImageFactory;
