import { CombinedParams, directorySpec, params, SimpleDisplayComp } from "@focuson/forms";
import { DirectorySpec, loadFile } from "@focuson/files";
import { GenerateLogLevel } from "@focuson/utils";
import process from "process";

export const logLevel: GenerateLogLevel = 'detailed';
export let javaOutputRoot = '../formJava'
export const tsRoot = "../formTs"

const MyCombineCD: SimpleDisplayComp = { import: "@focuson/form_components", name: "MyCombined" }


export const directorySpecPointingAtNodeModules: DirectorySpec = {
  ...directorySpec,
  backup: (process.env[ 'yarn' ] ? '../../' : '') + 'node_modules/@focuson/forms'
}

export const focusOnVersion: string = JSON.parse ( loadFile ( 'package.json' ) ).dependencies[ "@focuson/forms" ]


const details = JSON.parse ( loadFile ( 'project.details.json' ) ).details;
export const javaPort = details.javaPort
export const tsPort: number = details.tsPort
if ( !javaPort || !tsPort ) {
  console.log ( "exiting. please define javaPort and tsPort in the project.details file, in the details section" );
  process.exit ( 2 )
}
console.log ( "JavaPort is", javaPort, "tsPort is", tsPort )

export const devAppConfig = {
  javaPort,
  tsPort,
  fetch: `fetchWithDelay ( 1, fetchWithPrefix ( 'http://localhost:${javaPort}', loggingFetchFn ) )`,
  combine: MyCombineCD,
  debug: { fetcherDebug: true, restDebug: false, selectedPageDebug: false, loadTreeDebug: false, showTracing: false, recordTrace: true }
}