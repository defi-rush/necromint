// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "hardhat/console.sol";


contract NecroMint is ERC721Enumerable {

    struct BurnedToken {
        address erc721Address;
        uint256 id;
    }

    address constant public BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    mapping (uint256 => BurnedToken) tokenInfo;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function mint(address erc721Address, uint256 id) public {
        uint256 tokenId = totalSupply();
        require(tokenId < 6669, "Max supply");  // && !tokenInfo[id]);
        require(IERC721(erc721Address).ownerOf(id) == BURN_ADDRESS, "Mint for existent token");
        tokenInfo[tokenId] = BurnedToken({ erc721Address: erc721Address, id: id });
        _mint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        BurnedToken memory burnedToken = tokenInfo[tokenId];
        return IERC721Metadata(burnedToken.erc721Address).tokenURI(burnedToken.id);
    }

}
