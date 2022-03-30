const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("butter");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  //   console.log("Contract deployed by:", owner.address);

  // Let's be extra generous with our payment (we're paying more than required)
  let txn = await domainContract.register("peanut",  {value: hre.ethers.utils.parseEther('2341')});
  await txn.wait();

  // const domainAddress = await domainContract.getAddress("peanut");
  // console.log("Owner of domain peanut:", domainAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  // Quick! Grab the funds from the contract! (as superCoder)
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch(error){
    console.log("Could not rob contract");
  }

  // Let's look in their wallet so we can compare later
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  // Oops, looks like the owner is saving their money!
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();
  
  // Fetch balance of contract & owner
  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  // Trying to set a record that doesn't belong to me!
  // txn = await domainContract.connect(randomPerson).setRecord("peanut", "Haha my domain now!");
  // await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
