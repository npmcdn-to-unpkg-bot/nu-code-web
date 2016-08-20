import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Submission } from '../models';

const DefaultTemplate = `Enter your code here.
Read input from STDIN. Write output to STDOUT.`

const Templates = {
  'c': `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main()
{
  // Enter your code here.
  // Read input from STDIN. Write output to STDOUT.

  return 0;
}
`,
  'cpp': `#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
  // Enter your code here.
  // Read input from STDIN. Write output to STDOUT.

  return 0;
}
`,
  'csharp': `using System;
using System.Collections.Generic;
using System.IO;

class Solution {
  static void Main(String[] args) {
    // Enter your code here.
    // Read input from STDIN. Write output to STDOUT.
  }
}
`,
  'go': `package main
import "fmt"

func main() {
  // Enter your code here.
  // Read input from STDIN. Write output to STDOUT.
}
`,
  'java': `import java.util.*;

public class Solution {
  public static void main(String[] args) {
    // Enter your code here.
    // Read input from STDIN. Write output to STDOUT.
    // Your class MUST be named \`Solution\`.
  }
}
`,
  'js': `function main(input) {
  // Enter your code here.
  // Read input from the input variable. Write output to STDOUT.
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function (input) {
  _input += input;
});

process.stdin.on('end', function () {
  main(_input);
});
`,
  'python': `# Enter your code here.
# Read input from STDIN. Write output to STDOUT.
`,
  'python3': `# Enter your code here.
# Read input from STDIN. Write output to STDOUT.
`,
  'rust': `fn main() {
  // Enter your code here.
  // Read input from STDIN. Write output to STDOUT.
}
`,
  'ts': `function main(input: string) {
  // Enter your code here.
  // Read input from the input variable. Write output to STDOUT.
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function (input) {
  _input += input;
});

process.stdin.on('end', function () {
  main(_input);
});
`
};

@Injectable()
export class SubmissionTemplateService {
  constructor() { }

  // TODO: make a user preference
  getPreferredLanguage(): Observable<string> {
    return Observable.of('java');
  }

  // TODO: use firebase and lazy load
  getTemplate(langId: string): Observable<string> {
    let template = Templates[langId] || DefaultTemplate;
    return Observable.of(template);
  }

  getDefaultSubmission(): Observable<Submission> {
    return this.getPreferredLanguage()
      .flatMap(preferredLanguage =>
        this.getTemplate(preferredLanguage)
          .map(template => ({
            lang: preferredLanguage,
            src: template
          })));
  }
}
