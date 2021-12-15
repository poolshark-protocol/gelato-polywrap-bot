import { queryResolver } from "./utils";
import { ethers } from "ethers";

const main = async () => {
  const userConfig = {};
  const gasPrice = ethers.utils.parseUnits("100", "gwei");

  queryResolver("rinkeby", "local", userConfig, gasPrice);
};

main();
