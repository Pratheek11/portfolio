"use client";

import { AngularOriginal, DockerOriginal, GoOriginal, HelmOriginal, JavaOriginal, JavascriptOriginal, KubernetesOriginal, ReactOriginal, SpringOriginal } from "devicons-react";

export default function Skills() {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mb-1">
      <div className="flex flex-col w-full h-full justify-evenly gap-10 md:gap-5">
        <div className="w-full flex items-center flex-col gap-2">
          <div>
            <h3>Languages</h3>
          </div>
          <div className="flex items-center flex-wrap gap-2 justify-center">
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <JavaOriginal size="48" />
              <p>Java</p>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <JavascriptOriginal size="48" />
              <p>JavaScript</p>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <GoOriginal size="48" />
              <p>Go</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center flex-col gap-2">
          <div>
            <h3>Frameworks</h3>
          </div>
          <div className="flex items-center flex-wrap gap-2 justify-center">
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <ReactOriginal size="48" />
              <p>React</p>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <AngularOriginal size="48" />
              <p>Angular</p>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <SpringOriginal size="48" />
              <p>SpringBoot</p>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <KubernetesOriginal size="48" />
              <p>Kubernetes</p>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <DockerOriginal size="48" />
              <p>Docker</p>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md shadow-sm border-[0.5px] border-gray-500">
              <HelmOriginal size="48" />
              <p>Helm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
