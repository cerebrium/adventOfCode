import main from './questions/question1';

async function runMain() {
  console.log('running this');
  console.log(await main());
}

runMain();
