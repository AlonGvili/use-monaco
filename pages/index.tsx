import React from 'react';
import { plugins, useMonacoEditor } from '../src';
import themes from '../src/themes';
import '../src/plugins/typings/typings.monaco.worker';

import '../src/plugins/graphql/graphql.monaco.worker';
import '../src/plugins/prettier/prettier.monaco.worker';

const defaultValue = `
import {
  useMonacoEditor,
  prettier,
} from 'https://cdn.pika.dev/use-monaco@0.0.3';
import themes from 'https://cdn.pika.dev/use-monaco@0.0.3/themes';
import * as React from 'https://cdn.pika.dev/react';
import ReactDOM from 'https://cdn.pika.dev/react-dom';
import htm from 'https://cdn.pika.dev/htm';
const html = htm.bind(React.createElement);

let Editor = () => {
  const { containerRef, monaco, model, loading } = useMonacoEditor({
    plugins: [prettier(['graphq'])],
    themes,
    theme: 'github',
    path: 'model.graphql',
    defaultValue: ['type Query {}'].join('\n'),
  });

  return html\`<div
    ref=\${containerRef}
    style=\${{ height: 800, width: 600 }}
  />\`;
};

ReactDOM.render(html\`<\${Editor} />\`, document.getElementById('root'));

`;

let Editor = () => {
  const { containerRef, monaco, loading } = useMonacoEditor({
    paths: {
      workers: 'http://localhost:3000/_next/static/workers',
    },
    themes: themes as any,
    plugins: [
      plugins.prettier(['typescript']),
      plugins.typings(),
      // graphql({
      //   uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      // }),
    ],
    path: 'index.ts',
    language: 'typescript',
    defaultValue,
    theme: 'vs-light',
    editorDidMount: (editor, monaco) => {
      monaco.languages.typescript.loadTypes('faunadb', '2.13.0');
      monaco.languages.typescript.exposeGlobal('faunadb', 'query', 'q');
    },
  });

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style
        // @ts-ignore
        jsx
        global
      >
        {`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont;
          }
        `}
      </style>
      <pre
        style={{ fontFamily: 'SF Mono', fontWeight: 'bold', marginLeft: 32 }}
      >
        🗒️{' '}
        <a
          href="https://github.com/nksaraf/use-monaco"
          style={{ textDecoration: 'none' }}
        >
          use-monaco
        </a>
      </pre>
      <div style={{ display: 'flex', flex: 1 }}>
        <div ref={containerRef} style={{ width: '100vw', height: '100%' }} />
      </div>
    </div>
  );
};

export default () => {
  return (
    <div>
      <Editor />
    </div>
  );
};
