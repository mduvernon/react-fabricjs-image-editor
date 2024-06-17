// React
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
// Modules
import { ImageMapEditor } from 'modules/editor-imagemap';
import { FlowContainer, Title } from 'common/components';

type EditorType = 'imagemap' | 'workflow' | 'flow' | 'hexgrid' | 'fiber';

const App: FC = () => {

	const [activeEditor, setActiveEditor] = useState<EditorType>('imagemap');

	const handleChangeEditor = ({ key }) => {
		setActiveEditor(key);
	};

	const renderEditor = (activeEditor: EditorType) => {
		switch (activeEditor) {
			case 'imagemap':
				return <ImageMapEditor />;
			case 'workflow':
			// return <WorkflowEditor />;
			case 'flow':
			// return <FlowEditor />;
			case 'hexgrid':
			// return <HexGridEditor />;
			case 'fiber':
			// return <FiberEditor />;
		}
	};

	return (
		<div className="rde-main">
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="React Design Editor has started to developed direct manipulation of editable design tools like Powerpoint, We've developed it with react.js, ant.design, fabric.js "
				/>
				<link rel="manifest" href="./manifest.json" />
				<link rel="shortcut icon" href="./favicon.ico" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
				<title>React Design Editor</title>
				<script async={true} src="https://www.googletagmanager.com/gtag/js?id=G-EH7WWSK514" />
				<script>
					{`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-EH7WWSK514');
                        `}
				</script>
				<script async={true} src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
			</Helmet>
			<div className="rde-title">
				<Title
					onChangeEditor={handleChangeEditor}
					currentEditor={activeEditor}
				/>
			</div>
			<FlowContainer>
				<div className="rde-content">
					{renderEditor(activeEditor)}
				</div>
			</FlowContainer>
		</div>
	);
}

export default App;
