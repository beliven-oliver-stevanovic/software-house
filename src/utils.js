export const generateProjectName = () => {
  const adjectives = [
    'Red',
    'Green',
    'Blue',
    'Yellow',
    'White',
    'Black',
    'Orange',
    'Purple',
    'Pink',
    'Brown'
  ]
  const nouns = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon'
  ]
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adjective} ${noun} ${Math.floor(Math.random() * 1000)}`
}

export const generateEmployeeName = () => {
  const firstNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Ivan',
    'Judy'
  ]
  const lastNames = [
    'Smith',
    'Johnson',
    'Brown',
    'Taylor',
    'Anderson',
    'Harris',
    'Clark',
    'Lewis',
    'Lee',
    'Walker'
  ]
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}
