import main from './questions/question2';

async function runMain() {
  console.log('running this');
  console.log(await main());
}

runMain();
