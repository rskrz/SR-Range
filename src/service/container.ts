import { GetRepoController, AppService } from "@/controller/repo_controller"
import Axios from "axios"

export enum Dependency {
  RepoController = "RepoController",
  AppService = "AppService"
}

class DiContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private overrides: { [key in Dependency]?: any } = {}

  override<T>(dependency: Dependency, value: T): void {
    this.overrides[dependency] = value
  }

  resetOverrides(): void {
    this.overrides = {}
  }

  inject<T>(dependency: Dependency): T {
    const overridenValue = this.overrides[dependency]
    if (overridenValue) {
      return overridenValue
    }

    switch (dependency) {
      case Dependency.AppService:
        return (new AppService(Axios.create()) as unknown) as T
      case Dependency.RepoController:
        return (new GetRepoController(this.inject(Dependency.AppService)) as unknown) as T
    }
  }
}

export const Di = new DiContainer()
