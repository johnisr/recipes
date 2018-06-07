// Given a seed, returns a pseudorandom number
// can be used to generate the same list of pseudorandom numbers
export default (seed, maximum, minimum) => {
  const max = maximum || 1;
  const min = minimum || 0;

  const randomSeed = (seed * 9301 + 49297) % 233280;
  const rnd = randomSeed / 233280;

  return min + rnd * (max - min);
};
