//Helper function for implementation of interface
function resolvePrecept(interfaceName) {
  return function curry() {
    throw "Not implemented exception";
  };
}
module.exports = { resolvePrecept };
