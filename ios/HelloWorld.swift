//
//  RNSwiftTest.swift
//  ollieVideo
//
//  Created by Nate on 4/24/20.
//  Copyright © 2020 Facebook. All rights reserved.
//


import Foundation
import UIKit

@objc(HelloWorld)

class HelloWorld: NSObject, RCTBridgeModule{
  
  static func moduleName() -> String!{
    return "HelloWorld";
  }
  
  static func requiresMainQueueSetup () -> Bool {
    return true;
  }
  
  
  @objc
  func ShowMessage(_ message:NSString, duration:Double) -> Void {
    let alert = UIAlertController(title:nil, message: message as String, preferredStyle: .alert);
    let seconds:Double = duration;
    alert.view.backgroundColor = .black
    alert.view.alpha = 0.5
    alert.view.layer.cornerRadius = 14
    
    DispatchQueue.main.async {
      (UIApplication.shared.delegate as? AppDelegate)?.window.rootViewController?.present(alert, animated: true, completion: nil);
    }
    
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + seconds, execute: {
      alert.dismiss(animated: true, completion: nil);
    })
  }
  
  

  //      let exporter = NextLevelSessionExporter(withAsset: asset)
  //      exporter.outputFileType = AVFileType.mp4
  //      let tmpURL = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
  //          .appendingPathComponent(ProcessInfo().globallyUniqueString)
  //          .appendingPathExtension("mp4")
  //      exporter.outputURL = tmpURL
  //
  //      let compressionDict: [String: Any] = [
  //          AVVideoAverageBitRateKey: NSNumber(integerLiteral: 6000000),
  //          AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel as String,
  //      ]
  //      exporter.videoOutputConfiguration = [
  //          AVVideoCodecKey: AVVideoCodecH264,
  //          AVVideoWidthKey: NSNumber(integerLiteral: 480),
  //          AVVideoHeightKey: NSNumber(integerLiteral: 848),
  //          AVVideoScalingModeKey: AVVideoScalingModeResizeAspectFill,
  //          AVVideoCompressionPropertiesKey: compressionDict
  //      ]
  //      exporter.audioOutputConfiguration = [
  //          AVFormatIDKey: kAudioFormatMPEG4AAC,
  //          AVEncoderBitRateKey: NSNumber(integerLiteral: 128000),
  //          AVNumberOfChannelsKey: NSNumber(integerLiteral: 2),
  //          AVSampleRateKey: NSNumber(value: Float(44100))
  //      ]
  //
  //      exporter.export(progressHandler: { (progress) in
  //          self.sendEvent(withName: "onReady", body: ["percent": progress * 100, "result": NSNull()])
  //      }, completionHandler: { result in
  //          switch result {
  //          case .success(let status):
  //              switch status {
  //              case .completed:
  //                self.sendEvent(withName: "onReady", body: ["percent": 100, "result": exporter.outputURL?.description])
  //                callback([["success": true, "uri": exporter.outputURL?.description ?? ""]])
  //                  break
  //              default:
  //              callback([["success": false]])
  //                  break
  //              }
  //              break
  //          case .failure(let error):
  //          callback([["success": false]])
  //              break
  //          }
  //      })
}
