//
//  RNCameraRoll.swift
//  ollieVideo
//
//  Created by Nate on 4/24/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import UIKit


@objc(RNCameraRoll)

class RNCameraRoll: NSObject, RCTBridgeModule{
  
  static func moduleName() -> String!{
    return "RNCameraRoll";
  }
  
  static func requiresMainQueueSetup () -> Bool {
    return true;
  }
  
  
  @objc
  func SaveToCameraRoll(_ uri:NSString) -> Void {
    print("SAVING: ", uri)
    print(String(uri).dropFirst(8))
    print("Done")
    let fileUrl = URL(fileURLWithPath: String(String(uri).dropFirst(8)))
    do {
      let imageData = try Data(contentsOf: fileUrl)
      let image = UIImage(data: imageData)
      print(image?.size ?? 0)
    }
    catch {
      print(error)
    }
    
  }
}

