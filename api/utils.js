export function gini(values) {
  if (!values || values.length === 0) return 0;
  const arr = Array.from(values).slice().sort((a,b)=>a-b);
  const n = arr.length;
  const mean = arr.reduce((s,x)=>s+x,0) / n;
  if (mean === 0) return 0;
  let g = 0;
  for (let i=0;i<n;i++) {
    g += (2*(i+1) - n - 1) * arr[i];
  }
  return g / (n * n * mean);
}
