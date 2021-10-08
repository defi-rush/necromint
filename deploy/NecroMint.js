module.exports = async ({
  getNamedAccounts, deployments,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const NecroMint = await deploy('NecroMint', {
    from: deployer,
    log: true,
    args: ['NecroMint', 'NECRO']
  });
}
