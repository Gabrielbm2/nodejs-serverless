// sst-env.d.ts
import "sst/node/table";

declare module "sst/node/table" {
  export interface TableResources {
    Files: {
      tableName: string;
    };
  }
}
