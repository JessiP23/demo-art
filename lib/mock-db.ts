"use client";

import { v4 as uuid } from "uuid";
import { artworksSeed, seedUser } from "./mock-data";
import {
  type Analytics,
  type Artwork,
  type ConciergeRequest,
  type Recommendation,
  type TasteProfile,
  type Transaction,
  type User,
} from "./types";

type DB = {
  users: User[];
  artworks: Artwork[];
  recommendations: Recommendation[];
  concierge_requests: ConciergeRequest[];
  transactions: Transaction[];
};

const DB_KEY = "artmatch_db_v1";

const starter: DB = {
  users: [seedUser],
  artworks: artworksSeed,
  recommendations: [],
  concierge_requests: [],
  transactions: [],
};

function inBrowser() {
  return typeof window !== "undefined";
}

export function readDB(): DB {
  if (!inBrowser()) {
    return starter;
  }
  const raw = window.localStorage.getItem(DB_KEY);
  if (!raw) {
    window.localStorage.setItem(DB_KEY, JSON.stringify(starter));
    return starter;
  }
  return JSON.parse(raw) as DB;
}

export function writeDB(db: DB) {
  if (!inBrowser()) {
    return;
  }
  window.localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function resetDB() {
  writeDB(starter);
}

export const dbApi = {
  signUp(email: string, password: string, name: string) {
    const db = readDB();
    if (db.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const user: User = {
      id: uuid(),
      email,
      name,
      password,
      taste_profile: null,
      subscription_tier: "free",
      saved_artworks: [],
    };
    db.users.push(user);
    writeDB(db);
    return user;
  },
  login(email: string, password: string) {
    const db = readDB();
    const user = db.users.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return user;
  },
  getUser(userId: string) {
    const db = readDB();
    return db.users.find((user) => user.id === userId) ?? null;
  },
  listUsers() {
    return readDB().users;
  },
  updateTasteProfile(userId: string, tasteProfile: TasteProfile) {
    const db = readDB();
    const user = db.users.find((entry) => entry.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.taste_profile = tasteProfile;
    writeDB(db);
    return user;
  },
  saveArtwork(userId: string, artworkId: string) {
    const db = readDB();
    const user = db.users.find((entry) => entry.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (!user.saved_artworks.includes(artworkId)) {
      user.saved_artworks.push(artworkId);
      writeDB(db);
    }
    return user.saved_artworks;
  },
  updateSubscription(userId: string, tier: User["subscription_tier"]) {
    const db = readDB();
    const user = db.users.find((entry) => entry.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.subscription_tier = tier;
    writeDB(db);
    return user;
  },
  getArtworks() {
    return readDB().artworks;
  },
  getArtwork(artworkId: string) {
    return readDB().artworks.find((artwork) => artwork.id === artworkId) ?? null;
  },
  upsertArtwork(artwork: Artwork) {
    const db = readDB();
    const index = db.artworks.findIndex((entry) => entry.id === artwork.id);
    if (index >= 0) {
      db.artworks[index] = artwork;
    } else {
      db.artworks.push(artwork);
    }
    writeDB(db);
    return artwork;
  },
  createConciergeRequest(user_id: string, artwork_id: string, note: string) {
    const db = readDB();
    const request: ConciergeRequest = {
      id: uuid(),
      user_id,
      artwork_id,
      status: "pending",
      note,
      created_at: new Date().toISOString(),
    };
    db.concierge_requests.push(request);
    writeDB(db);
    return request;
  },
  updateConciergeStatus(requestId: string, status: ConciergeRequest["status"]) {
    const db = readDB();
    const request = db.concierge_requests.find((entry) => entry.id === requestId);
    if (!request) {
      throw new Error("Request not found");
    }
    request.status = status;
    writeDB(db);
    return request;
  },
  listConciergeRequests() {
    return readDB().concierge_requests;
  },
  createTransaction(transaction: Omit<Transaction, "id" | "created_at">) {
    const db = readDB();
    const payload: Transaction = {
      ...transaction,
      id: uuid(),
      created_at: new Date().toISOString(),
    };
    db.transactions.push(payload);
    writeDB(db);
    return payload;
  },
  listTransactions() {
    return readDB().transactions;
  },
  analytics(): Analytics {
    const db = readDB();
    const gmv = db.transactions.reduce((total, transaction) => total + transaction.amount, 0);
    return {
      users: db.users.length,
      artworks: db.artworks.length,
      conciergePending: db.concierge_requests.filter((entry) => entry.status === "pending").length,
      transactions: db.transactions.length,
      gmv,
    };
  },
};
