//
//  RNEventEmitter.swift
//  ollieVideo
//
//  Created by Nate on 4/24/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(RNEventEmitter)
open class RNEventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!
  
  override init() {
    super.init()
    RNEventEmitter.emitter = self
  }

  @objc
  open override func supportedEvents() -> [String] {
    print("EEEE")
    return ["onReady", "onPending", "onFailure"]
  }
  
  @objc
  func testEvent() {
    RNEventEmitter.emitter.sendEvent(withName: "onReady", body: [])
  }
  
  public override static func requiresMainQueueSetup () -> Bool {
    return true;
  }
}

