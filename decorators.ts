export function displayClassName(target: Function) {
  console.log(`class name: ${target.name}`);
}

export function displayClassNameWithPurpose(purpose: string) {
  return (target: Function) => {
    console.log(`class name: ${target.name}, purpose: ${purpose}`)
  }
}