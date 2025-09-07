import {
  GraphEditor,
  type GraphEditorConfig,
} from "@kennycha/react-graph-tree";
import { FaNpm, FaGithub } from "react-icons/fa";
import "./App.css";

function App() {
  const config: GraphEditorConfig = {
    initialGraph: {
      nodes: [
        {
          id: "detector1",
          title: "Detector 1",
          type: "detector",
          position: { x: 50, y: 100 },
          payload: {},
        },
        {
          id: "tracker1",
          title: "Tracker 1",
          type: "tracker",
          position: { x: 400, y: 100 },
          payload: {},
        },
        {
          id: "feature1",
          title: "Feature 1",
          type: "feature",
          position: { x: 750, y: 100 },
          payload: {},
        },
        {
          id: "filter1",
          title: "Filter 1",
          type: "filter",
          position: { x: 750, y: 300 },
          payload: {},
        },
        {
          id: "output1",
          title: "Output 1",
          type: "output",
          position: { x: 1100, y: 100 },
          payload: {},
        },
      ],
      edges: [
        { id: "edge1", sourceNodeId: "detector1", targetNodeId: "tracker1" },
        { id: "edge2", sourceNodeId: "tracker1", targetNodeId: "feature1" },
        { id: "edge3", sourceNodeId: "tracker1", targetNodeId: "filter1" },
        { id: "edge4", sourceNodeId: "filter1", targetNodeId: "output1" },
        { id: "edge5", sourceNodeId: "feature1", targetNodeId: "output1" },
      ],
      viewState: {
        offset: { x: 0, y: 0 },
        zoom: 0.75,
      },
    },
    nodeTypes: [
      { id: "detector", label: "Detector", color: "red" },
      { id: "tracker", label: "Tracker", color: "blue" },
      { id: "feature", label: "Feature", color: "green" },
      { id: "filter", label: "Filter", color: "purple" },
      {
        id: "output",
        label: "Output",
        color: "orange",
        allowMultipleInputs: true,
      },
    ],
    onGraphChange: (graph, node, edges) => {
      console.log(graph, node, edges);
    },
    onNodeChange: (node, changeType, data) => {
      console.log(node, changeType, data);
    },
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          React Graph Tree Sample
        </h1>
        <div className="app-links">
          <a 
            href="https://www.npmjs.com/package/@kennycha/react-graph-tree"
            className="app-link npm-link"
          >
            <FaNpm /> npm package
          </a>
          <a 
            href="https://github.com/kennycha/react-graph-tree"
            className="app-link github-link"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </header>
      
      <div className="graph-container">
        <GraphEditor config={config} />
      </div>
    </div>
  );
}

export default App;
