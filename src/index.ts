import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    prevHash: string,
    timestamp: number,
    data: string
  ): string => {
    return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
  };

  static isBlock = (b: Block): boolean => {
    return (
      typeof b.index === "number" &&
      typeof b.hash === "string" &&
      typeof b.prevHash === "string" &&
      typeof b.data === "string" &&
      typeof b.timestamp === "number"
    );
  };

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "202020", "", "hello", Date.now());

let blockchain: [Block] = [genesisBlock];

const getBlockchain = (): Block[] => {
  return blockchain;
};

const getLastBlock = (): Block => {
  return blockchain[blockchain.length - 1];
};

const getNewTimeStamp = (): number => {
  return Math.round(new Date().getDate() / 1000);
};

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLastBlock();
  const newIndex: number = prevBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    prevBlock.hash,
    newTimeStamp,
    data
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    prevBlock.hash,
    data,
    newTimeStamp
  );

  addBlock(newBlock);

  return newBlock;
};

const getHashforBlock = (b: Block): string => {
  return Block.calculateBlockHash(b.index, b.prevHash, b.timestamp, b.data);
};

const isBlockValid = (candidateBlock: Block, prevBlock: Block): boolean => {
  if (!Block.isBlock(candidateBlock)) {
    return false;
  } else if (prevBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (prevBlock.hash !== candidateBlock.prevHash) {
    return false;
  } else if (candidateBlock.hash !== candidateBlock.hash) {
    return false;
  }

  return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLastBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("first");
createNewBlock("second");
createNewBlock("third");

console.log(getBlockchain());

export {};
