// data/floorplan.js

// 1) Sample data model
export const rooms = {
    '1F-Foyer': { x: 80,  y: 200, floor: 1, label: 'BME 1st Floor Foyer' },
    '1F-Kubelick': { x: 200, y: 200, floor: 1, label: 'Kubelick Lab' },
    '1F-Lounge': { x: 320, y: 200, floor: 1, label: 'BME Student Lounge' },
    '2F-Papin': { x: 200, y: 80,  floor: 2, label: 'Papin Lab' },
    '2F-Griffin': { x: 320, y: 80,  floor: 2, label: 'Griffin Lab' },
    'Stairs': { x: 260, y: 200, floor: 1, label: 'Main Stairwell' }
  };
  
  // Each connection is a bidirectional edge between two rooms
  export const connections = [
    { from: '1F-Foyer',    to: '1F-Kubelick' },
    { from: '1F-Kubelick', to: '1F-Lounge' },
    { from: '1F-Kubelick', to: 'Stairs' },
    { from: 'Stairs',      to: '2F-Papin' },
    { from: '2F-Papin',    to: '2F-Griffin' }
  ];
  
  // 2) Build an adjacency list from our connections
  function buildGraph(connections) {
    const graph = {};
    connections.forEach(({ from, to }) => {
      if (!graph[from]) graph[from] = [];
      if (!graph[to]) graph[to] = [];
      graph[from].push(to);
      graph[to].push(from);
    });
    return graph;
  }
  
  // 3) Simple BFS to find a path between start and end
  function bfs(graph, start, end) {
    const queue = [start];
    const visited = new Set([start]);
    const prev = {}; // to reconstruct path
  
    while (queue.length > 0) {
      const current = queue.shift();
      if (current === end) {
        return reconstructPath(prev, start, end);
      }
      for (const neighbor of (graph[current] || [])) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          prev[neighbor] = current;
          queue.push(neighbor);
        }
      }
    }
    return null; // no path found
  }
  
  function reconstructPath(prev, start, end) {
    const path = [];
    let current = end;
    while (current !== undefined) {
      path.unshift(current);
      current = prev[current];
      if (current === start) {
        path.unshift(start);
        break;
      }
    }
    // If start isn't at the front, no valid path
    if (path[0] !== start) return null;
    return path;
  }
  
  // 4) Main pathfinding export
  export function findPath(start, end) {
    const graph = buildGraph(connections);
    return bfs(graph, start, end);
  }
  