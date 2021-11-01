function objectSort(obj: Object): Object {
  // ソートする
  const sorted = Object.entries(obj).sort();

  // valueを調べ、objectならsorted entriesに変換する
  for(const i in sorted){
      const val = sorted[i][1];
      if(typeof val === "object"){
          sorted[i][1] = objectSort(val);
      }
  }

  return sorted;
}

export function compareObject(a: Object, b: Object): boolean {
  return JSON.stringify(objectSort(a)) === JSON.stringify(objectSort(b))
}
