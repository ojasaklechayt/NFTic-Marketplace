import { NFTMarket } from "../contracts/NFTic.sol";

const provider = web3.eth.getProvider();

describe("NFTMarket", () => {
    let market, owner, buyer, seller;

    beforeEach(async () => {
        market = new NFTMarket(provider);
        owner = await web3.eth.accounts.create();
        buyer = await web3.eth.accounts.create();
        seller = await web3.eth.accounts.create();
    });

    it("should create an NFT", async () => {
        const tokenURI = "https://example.com/nft.json";
        await market.createNFT(tokenURI);

        const tokenId = await market.tokenURI(owner, tokenURI);
        expect(tokenId).toBeGreaterThan(0);
    });

    it("should list an NFT for sale", async () => {
        const tokenId = await market.createNFT("");
        const price = 100;
        await market.listNFTAsync(tokenId, price, provider);

        const listing = market.getListingAsync(tokenId, provider);
        expect(listing.price).toBe(price);
        expect(listing.seller).toBe(owner);
    });

    it("should buy an NFT", async () => {
        const tokenId = await market.createNFT("");
        const price = 100;
        await market.listNFTAsync(tokenId, price, provider);

        await market.buyNFTAsync(tokenId, provider);

        expect(market.ownerOfAsync(tokenId, provider)).toBe(buyer);
        expect(seller.balance).toBe(price * 0.95);
    });

    it("should cancel a listing", async () => {
        const tokenId = await market.createNFT("");
        const price = 100;
        await market.listNFTAsync(tokenId, price, provider);

        await market.cancelListingAsync(tokenId, provider);

        expect(market.getListingAsync(tokenId, provider)).toBeNull();
    });

    it("should withdraw funds", async () => {
        market.balance = 100;
        await market.withdrawFundsAsync(provider);
        expect(owner.balance).toBe(100);
    });
});