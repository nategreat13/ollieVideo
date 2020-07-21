//
//  RNSample.swift
//  ollieVideo
//
//  Created by Nate on 4/24/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import AVFoundation


@objc(RNTranscode)

class RNSample: RCTEventEmitter{
  
  // Could support onStart and onCancelled if we want
  @objc override func supportedEvents() -> [String]! {
    return ["onProgress", "onDone", "onError"]
  }
  
  // We can maybe remove the callback
  @objc func transcodeVideo(_ uri: String, callback: @escaping RCTResponseSenderBlock) -> Void {
      
    if let url = URL(string: uri) {
      let asset = AVAsset(url: url)

      let outputURL = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(ProcessInfo().globallyUniqueString)
      .appendingPathExtension("mp4")
      let preset = AVAssetExportPreset640x480
      let outFileType = AVFileType.mp4

      AVAssetExportSession.determineCompatibility(ofExportPreset: preset, with: asset, outputFileType: outFileType, completionHandler: { (isCompatible) in
          if !isCompatible {
            self.sendEvent(withName: "onError", body: ["error": "Not compatible"])
          }
          else {

            guard let export = AVAssetExportSession(asset: asset, presetName: preset) else {
                return
            }
            export.outputURL = outputURL
            export.outputFileType = outFileType
            
            export.exportAsynchronously { () -> Void in
              if (export.status == AVAssetExportSession.Status.completed) {
                self.sendEvent(withName: "onDone", body: ["result": outputURL.absoluteString])
              }
              else if (export.status == AVAssetExportSession.Status.failed || export.status == AVAssetExportSession.Status.cancelled) {
                self.sendEvent(withName: "onError", body: ["error": "Something went wrong"])
              }
            }
            self.sendProgress(export: export)
          }
      })

    }
    else {
      self.sendEvent(withName: "onError", body: ["error": "Something went wrong"])
    }
  }
  
  func sendProgress(export: AVAssetExportSession) {
    // Could put a timeout or something here
    while (export.status == AVAssetExportSession.Status.exporting || export.status == AVAssetExportSession.Status.waiting) {
      let progress = Float(export.progress);
      if (progress < 0.99) {
          self.sendEvent(withName: "onProgress", body: ["percent": progress*100])
      }
    }
  }

  override static func requiresMainQueueSetup () -> Bool {
    return true;
  }
  
  func moduleName() -> String!{
    return "RNTranscode";
  }

  
}


