import { NFTMarket, NFTTransfer as NFTTransferEvent } from "../generated/NFTMarket/NFTMarket"
import { NFTTransfer } from "../generated/schema"


export function handleNFTTransfer(event: NFTTransferEvent): void {
  const nft = new NFTTransfer(event.params.tokenID.toString());

  nft.to = event.params.to;
  nft.from = event.params.from;
  nft.price = event.params.price;
  const nftMarket = NFTMarket.bind(event.address);
  const tokenURI = nftMarket.tokenURI(event.params.tokenID);
  nft.tokenURI = tokenURI;
  nft.save();
}