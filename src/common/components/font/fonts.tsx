const fonts = {
	default: [
		{ name: 'Arial', type: 'sans-serif', ref: 'default' },
		{ name: 'Arial Black', type: 'sans-serif', ref: 'default' },
		{ name: 'Helvetica', type: 'sans-serif', ref: 'default' },
		{ name: 'Verdana', type: 'sans-serif', ref: 'default' },
		{ name: 'Trebuchet MS', type: 'sans-serif', ref: 'default' },
		{ name: 'Tahoma', type: 'sans-serif', ref: 'default' },
		{ name: 'MS Sans Serif', type: 'sans-serif', ref: 'default' },
		{ name: 'Symbol', type: 'sans-serif', ref: 'default' },
		{ name: 'Times', type: 'serif', ref: 'default' },
		{ name: 'Times New Roman', type: 'serif', ref: 'default' },
		{ name: 'MS Serif', type: 'serif', ref: 'default' },
		{ name: 'New York', type: 'serif', ref: 'default' },
		{ name: 'Palatino Linotype', type: 'serif', ref: 'default' },
		{ name: 'Book Antiqua', type: 'serif', ref: 'default' },
		{ name: 'Georgia', type: 'serif', ref: 'default' },
		{ name: 'Courier New', type: 'monospace', ref: 'default' },
		{ name: 'Courier', type: 'monospace' },
		{ name: 'Comic Sans MS', type: 'cursive', ref: 'default' },
		{ name: 'Lucida Console', type: 'cursive', ref: 'default' },
		{ name: 'Impact', type: 'fantasy', ref: 'default' },
	],
	google: [
		{ name: 'Abril Fatface', type: 'display', ref: 'google' },
		{ name: 'Alegreya Sans', type: 'sans-serif', ref: 'google' },
		{ name: 'Alegreya', type: 'serif', ref: 'google' },
		{ name: 'Amatic SC', type: 'handwriting', ref: 'google' },
		{ name: 'EB Garamond', type: 'serif', ref: 'google' },
		{ name: 'Fjalla One', type: 'serif', ref: 'google' },
		{ name: 'Josefin Sans', type: 'sans-serif', ref: 'google' },
		{ name: 'Lato', type: 'sans-serif', ref: 'google' },
		{ name: 'Merriweather', type: 'serif', ref: 'google' },
		{ name: 'Montserrat', type: 'sans-serif', ref: 'google' },
		{ name: 'Noto Sans', type: 'sans-serif', ref: 'google' },
		{ name: 'Open Sans Condensed', type: 'sans-serif', ref: 'google' },
		{ name: 'Open Sans', type: 'sans-serif', ref: 'google' },
		{ name: 'Oswald', type: 'sans-serif', ref: 'google' },
		{ name: 'Playfair Display', type: 'serif', ref: 'google' },
		{ name: 'PT Sans Narrow', type: 'sans-serif', ref: 'google' },
		{ name: 'PT Sans', type: 'sans-serif', ref: 'google' },
		{ name: 'Raleway', type: 'sans-serif', ref: 'google' },
		{ name: 'Roboto Mono', type: 'monospace', ref: 'google' },
		{ name: 'Roboto Slab', type: 'serif', ref: 'google' },
		{ name: 'Roboto', type: 'sans-serif', ref: 'google' },
		{ name: 'Source Sans Pro', type: 'serif', ref: 'google' },
	],
};

const Fonts = {
	getFonts() {
		return fonts;
	},
};

export { Fonts };

export default Fonts;