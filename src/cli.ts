#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const baseConfigQuestions = [
  {
    type: 'input',
    name: 'key',
    message: 'Base config key (e.g. default, auth, etc):',
    validate: (input: string) => input ? true : 'Key is required.'
  },
  {
    type: 'input',
    name: 'baseURL',
    message: 'Base URL:',
    validate: (input: string) => input ? true : 'Base URL is required.'
  },
  {
    type: 'input',
    name: 'headers',
    message: 'Headers (JSON, optional):',
    filter: (input: string) => input ? JSON.parse(input) : undefined
  },
  {
    type: 'input',
    name: 'responseType',
    message: 'Response type (optional):'
  }
];

const requestConfigQuestions = [
  {
    type: 'input',
    name: 'endpointKey',
    message: 'Endpoint key (e.g. getUser, updateProfile):',
    validate: (input: string) => input ? true : 'Endpoint key is required.'
  },
  {
    type: 'input',
    name: 'url',
    message: 'Endpoint URL (e.g. /users/<userId>):',
    validate: (input: string) => input ? true : 'URL is required.'
  },
  {
    type: 'list',
    name: 'method',
    message: 'HTTP method:',
    choices: ['get', 'post', 'put', 'patch', 'delete']
  },
  {
    type: 'input',
    name: 'headers',
    message: 'Headers (JSON, optional):',
    filter: (input: string) => input ? JSON.parse(input) : undefined
  },
  {
    type: 'input',
    name: 'pathParams',
    message: 'Path params (comma-separated, optional):',
    filter: (input: string) => input ? input.split(',').map((p: string) => p.trim()).filter(Boolean) : []
  },
  {
    type: 'input',
    name: 'queryParams',
    message: 'Query params (comma-separated, optional):',
    filter: (input: string) => input ? input.split(',').map((p: string) => p.trim()).filter(Boolean) : []
  }
];

async function main() {
  const { configType } = await inquirer.prompt({
    type: 'list',
    name: 'configType',
    message: 'Which config do you want to create?',
    choices: [
      { name: 'ApiBaseConfigs', value: 'base' },
      { name: 'ApiRequestConfigs', value: 'request' }
    ]
  });

  const { outputFormat } = await inquirer.prompt({
    type: 'list',
    name: 'outputFormat',
    message: 'Output format?',
    choices: [
      { name: 'TypeScript (.ts)', value: 'ts' },
      { name: 'JSON (.json)', value: 'json' }
    ]
  });

  let configs: any = {};
  let addMore = true;
  while (addMore) {
    let answers;
    if (configType === 'base') {
      answers = await inquirer.prompt(baseConfigQuestions);
      configs[answers.key] = {
        baseURL: answers.baseURL,
        ...(answers.headers && { headers: answers.headers }),
        ...(answers.responseType && { responseType: answers.responseType })
      };
    } else {
      answers = await inquirer.prompt(requestConfigQuestions);
      configs[answers.endpointKey] = {
        url: answers.url,
        method: answers.method,
        ...(answers.headers && { headers: answers.headers }),
        ...(answers.pathParams.length && { pathParams: answers.pathParams.map((name: string) => ({ name, required: true })) }),
        ...(answers.queryParams.length && { queryParams: answers.queryParams.map((name: string) => ({ name, required: false })) })
      };
    }
    const { more } = await inquirer.prompt({
      type: 'confirm',
      name: 'more',
      message: 'Add another?',
      default: false
    });
    addMore = more;
  }

  let fileName = configType === 'base' ? 'api.base.config' : 'api.request.config';
  if (outputFormat === 'json') {
    fs.writeFileSync(path.resolve(process.cwd(), `${fileName}.json`), JSON.stringify(configs, null, 2));
    console.log(`Wrote ${fileName}.json`);
  } else {
    const tsExport = `export default ${JSON.stringify(configs, null, 2)} as const;\n`;
    fs.writeFileSync(path.resolve(process.cwd(), `${fileName}.ts`), tsExport);
    console.log(`Wrote ${fileName}.ts`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
