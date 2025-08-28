const fsp = require("fs/promises");
const path = require("path");
const contentful = require('contentful');
require("dotenv").config(); 

const CONTENTS_FOLDER = path.join(process.cwd(), "contents");
const TOKEN_FILE_NAME = "nextSyncToken.txt";
const CONTENT_FOLDER = "content";
const ASSET_FOLDER = "asset";

async function loadData(filePath) {
    try {
        return await fsp.readFile(path.join(CONTENTS_FOLDER, filePath), "utf-8");
    } catch (error) {
        return false;
    }
}

async function saveData(filePath, data) {
    const absPath = path.join(CONTENTS_FOLDER, filePath);
    await fsp.mkdir(path.dirname(absPath), { recursive: true });
    await fsp.writeFile(absPath, data, "utf-8");
}

async function removeData(filePath) {
    try {
        await fsp.unlink(path.join(CONTENTS_FOLDER, filePath));
    } catch (error) {}
}

async function saveJSON(filePath, object) {
    await saveData(filePath, JSON.stringify(object, null, 2));
}

async function main() {
    const token = await loadData(TOKEN_FILE_NAME);
    const hasToken = token !== false;

    const client = contentful.createClient({
        space: process.env.CTF_SPACE,
        environment: process.env.CTF_ENVIRONMENT,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
    });

    const res = await client.sync({
        initial: hasToken ? false : true,
        nextSyncToken: hasToken ? token : undefined,
        resolveLinks: false,
    });

    const upsertedEntries = res.entries;
    const upsertedAssets = res.assets;
    const deletedEntries = res.deletedEntries;
    const deletedAssets = res.deletedAssets;
    const nextSyncToken = res.nextSyncToken;

    for (const upsertedEntry of upsertedEntries) {
        const id = upsertedEntry.sys.id;
        await saveJSON(path.join(CONTENT_FOLDER, `${id}.json`), upsertedEntry);
    }

    for (const upsertedAsset of upsertedAssets) {
        const id = upsertedAsset.sys.id;
        await saveJSON(path.join(ASSET_FOLDER, `${id}.json`), upsertedAsset);
    }

    for (const deletedEntry of deletedEntries) {
        const id = deletedEntry.sys.id;
        await removeData(path.join(CONTENT_FOLDER, `${id}.json`));
    }

    for (const deletedAsset of deletedAssets) {
        const id = deletedAsset.sys.id;
        await removeData(path.join(ASSET_FOLDER, `${id}.json`));
    }

    await saveData(TOKEN_FILE_NAME, nextSyncToken);

    console.table({ 
        upsertedEntries: upsertedEntries.length, 
        upsertedAssets: upsertedAssets.length, 
        deletedEntries: deletedEntries.length, 
        deletedAssets: deletedAssets.length 
    });
}

main();