// INFO namespaces

/// <reference path="components/project-list.ts" />
/// <reference path="components/project-input.ts" />

namespace App {
  // Initiate classes instance

  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
