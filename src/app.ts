interface Test {
  message: string,
  status: number
}

const t: Test = { message: 'init', status: 1 };

const el = document.getElementById('test')!;

el.addEventListener('click', () => {
  console.log('click')
})