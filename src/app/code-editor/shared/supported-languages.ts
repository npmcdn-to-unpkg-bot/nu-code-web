// A mapping between user-friendly display and the lang-id sent to the server for compilation.
export const SupportedLanguagesByDisplay = {
  'C': 'c',
  'C++': 'cpp',
  'C#': 'csharp',
  'Java': 'java',
  'JavaScript': 'js',
  'Python 2': 'python',
  'Python 3': 'python3'
};

// Self-called function that produces the inverse of SupportedLanguagesByDisplay
export const SupportedLanguagesByCode = (function () {
  var supportedLanguagesByCode = {};
  for (var displayName in SupportedLanguagesByDisplay) {
    if (SupportedLanguagesByDisplay.hasOwnProperty(displayName)) {
      supportedLanguagesByCode[SupportedLanguagesByDisplay[displayName]] = displayName;
    }
  }
  return supportedLanguagesByCode;
})();

// export const SupportedLanguages = {
//   'C': {
//     apiCode: 'c',
//     editorMode: 'text/x-csrc'
//   },
//   'C++': {
//     apiCode: 'cpp',
//     editorMode: 'text/x-c++src'
//   },
//   'C#': {
//     apiCode: 'csharp',
//     editorMode: 'text/x-csharp'
//   },,
//   'Java 8': {
//     apiCode: 'java',
//     editorMode: 'text/x-java'
//   },,
//   'JavaScript': {
//     apiCode: 'js',
//     editorMode: 'text/javascript'
//   },
//   'Python 2': {
//     apiCode: 'python',
//     editorMode: 'python'
//   } 'python',
//   'Python 3': 'python3'
// }

// [ {
//     name: 'C',
//     code: 'c'
//   }, {
//     name: 'C++',
//     code: 'cpp'
//   }, {
//     name: 'C#',
//     code: 'csharp'
//   }, {
//     name: 'Java 8',
//     code: 'java'
//   }, {
//     name: 'JavaScript',
//     code: 'js'
//   }, {
//     name: 'Python 2',
//     code: 'python'
//   }, {
//     name: 'Python 3',
//     code: 'python3'
//   } ];
