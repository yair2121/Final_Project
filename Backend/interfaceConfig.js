function resolvePrecept(interfaceName) {
  return function curry() {
    console.warn("requires an implementation for", interfaceName);
  };
}
module.exports = { resolvePrecept };
