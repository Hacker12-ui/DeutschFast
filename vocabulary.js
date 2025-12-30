// vocabulary.js - Vocabulary Service for DeutschFast

class VocabularyService {
  constructor() {
    this.wordlist = null;
    this.loaded = false;
  }

  // Load vocabulary from JSON file
  async loadVocabulary() {
    if (this.loaded) return this.wordlist;
    
    try {
      const response = await fetch('data/Goethe-A1-Complete-Wordlist.json');
      this.wordlist = await response.json();
      this.loaded = true;
      console.log(`✅ Loaded ${this.wordlist.metadata.totalWords} words`);
      return this.wordlist;
    } catch (error) {
      console.error('❌ Error loading vocabulary:', error);
      throw error;
    }
  }

  // Get all words
  getAllWords() {
    return this.wordlist?.words || [];
  }

  // Get word by ID
  getWordById(id) {
    return this.wordlist?.words.find(word => word.id === id);
  }

  // Get random word
  getRandomWord() {
    const words = this.getAllWords();
    return words[Math.floor(Math.random() * words.length)];
  }

  // Filter by word type
  getWordsByType(type) {
    return this.getAllWords().filter(word => word.wordType === type);
  }

  // Filter by gender
  getWordsByGender(gender) {
    return this.getAllWords().filter(word => word.gender === gender);
  }

  // Get nouns only
  getNouns() {
    return this.getWordsByType('Noun');
  }

  // Get verbs only
  getVerbs() {
    return this.getWordsByType('Verb');
  }

  // Search words
  searchWords(query) {
    const lowerQuery = query.toLowerCase();
    return this.getAllWords().filter(word => 
      word.german.toLowerCase().includes(lowerQuery) ||
      word.english.toLowerCase().includes(lowerQuery)
    );
  }

  // Get total count
  getTotalWords() {
    return this.wordlist?.metadata.totalWords || 0;
  }
}

// Create global instance
const vocabularyService = new VocabularyService();
