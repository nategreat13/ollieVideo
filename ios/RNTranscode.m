//
//  RNSample.m
//  ollieVideo
//
//  Created by Nate on 4/24/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>

@interface RCT_EXTERN_MODULE(RNTranscode, NSObject)
RCT_EXTERN_METHOD(supportedEvents)
RCT_EXTERN_METHOD(transcodeVideo:(NSString*)uri callback:(RCTResponseSenderBlock)) 

@end
