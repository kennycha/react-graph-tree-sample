import {
  GraphEditor,
  type Graph,
  type GraphEditorConfig,
} from "@kennycha/react-graph-tree";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./App.css";

const INITIAL_GRAPH: Graph = {
  nodes: [
    {
      id: "detector1",
      title: "Detector 1",
      type: "detector",
      position: { x: 50, y: 100 },
      payload: {},
      allowMultipleInputs: false,
    },
    {
      id: "tracker1",
      title: "Tracker 1",
      type: "tracker",
      position: { x: 400, y: 100 },
      payload: {},
      allowMultipleInputs: false,
    },
    {
      id: "feature1",
      title: "Feature 1",
      type: "feature",
      position: { x: 750, y: 100 },
      payload: {},
      allowMultipleInputs: false,
    },
    {
      id: "filter1",
      title: "Filter 1",
      type: "filter",
      position: { x: 750, y: 300 },
      payload: {},
      allowMultipleInputs: false,
    },
    {
      id: "output1",
      title: "Output 1",
      type: "output",
      position: { x: 1100, y: 100 },
      payload: {},
      allowMultipleInputs: true,
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
};

function App() {
  const [currentGraph, setCurrentGraph] = useState<Graph>(INITIAL_GRAPH);

  // Handle title/payload updates with prompt
  const handleTitleOrPayloadChange = async (
    nodeId: string,
    changeType: string
  ) => {
    const node = currentGraph.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    if (changeType === "title") {
      const newTitle = prompt(`Enter new title for ${node.title}:`, node.title);
      if (newTitle && newTitle !== node.title) {
        setCurrentGraph((prev) => ({
          ...prev,
          nodes: prev.nodes.map((n) =>
            n.id === node.id ? { ...n, title: newTitle } : n
          ),
        }));
      }
    } else if (changeType === "payload") {
      const payloadJson = JSON.stringify(node.payload, null, 2);
      const newPayloadStr = prompt(
        `Enter new payload (JSON) for ${node.title}:`,
        payloadJson
      );
      if (newPayloadStr && newPayloadStr !== payloadJson) {
        try {
          const newPayload = JSON.parse(newPayloadStr);
          setCurrentGraph((prev) => ({
            ...prev,
            nodes: prev.nodes.map((n) =>
              n.id === node.id ? { ...n, payload: newPayload } : n
            ),
          }));
        } catch (error) {
          console.error(error);
          alert("Invalid JSON format");
        }
      }
    }
  };

  const config: GraphEditorConfig = {
    graph: currentGraph,
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
      setCurrentGraph(graph);
    },
    onNodeChange: (nodeId, changeType, data) => {
      console.log(nodeId, changeType, data);

      if (changeType === "position") {
        const { x, y } = data as { x: number; y: number };
        // Only update JSON viewer, don't interfere with GraphEditor's internal state
        setCurrentGraph((prev) => ({
          ...prev,
          nodes: prev.nodes.map((node) =>
            node.id === nodeId ? { ...node, position: { x, y } } : node
          ),
        }));
      } else if (changeType === "title" || changeType === "payload") {
        handleTitleOrPayloadChange(nodeId, changeType);
      }
    },
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">React Graph Tree Sample</h1>
        <a
          href="https://github.com/kennycha/react-graph-tree-sample"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link-container"
        >
          <FaGithub size={20} />
          <p>View on GitHub</p>
        </a>
      </header>

      <div className="main-content">
        <div className="graph-container">
          <GraphEditor config={config} />
        </div>

        <div className="graph-json-viewer">
          <pre
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "12px",
              border: "1px solid #ddd",
            }}
          >
            {JSON.stringify(currentGraph, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
